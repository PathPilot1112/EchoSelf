import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import session from "express-session";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
  secret: process.env.SESSION_SECRET || "alter-fm-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 } 
}));


app.get("/login", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    response_type: "code",
    scope: [
      "user-top-read",
      "user-read-email",
      "playlist-read-private",
      "user-follow-read",
      "user-library-read",
    ].join(" "),
    state: "alter-fm-state",
  });
  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});


app.get("/auth/callback", async (req, res) => {
  const { code, state } = req.query;

  if (state !== "alter-fm-state") {
    return res.status(403).send("Invalid state — possible CSRF");
  }

  try {
 
    const tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token } = tokenRes.data;

 
    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;


    res.redirect("https://echoself-chi.vercel.app/loading");

  } catch (err) {
    console.error("Token exchange failed:", err.response?.data || err.message);
    res.status(500).send("Auth failed");
  }
});


app.get("/analyse", async (req, res) => {
  const token = req.session.access_token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const headers = { Authorization: `Bearer ${token}` };

  try {
   
    const [artistsRes, tracksRes, playlistsRes] = await Promise.all([
      axios.get("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term", { headers }),
      axios.get("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term", { headers }),
      axios.get("https://api.spotify.com/v1/me/playlists?limit=20", { headers }),
    ]);

    const topArtists = artistsRes.data.items;
    const topTracks  = tracksRes.data.items;
    const playlists  = playlistsRes.data.items;

    
    const trackIds = topTracks.map(t => t.id).join(",");
    const audioRes = await axios.get(
      `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
      { headers }
    );
    const audioFeatures = audioRes.data.audio_features.filter(Boolean);

  
    const avg = key =>
      Math.round(
        (audioFeatures.reduce((sum, t) => sum + (t[key] || 0), 0) / audioFeatures.length) * 100
      );

    const mood = {
      energy:          avg("energy"),        
      valence:         avg("valence"),       
      danceability:    avg("danceability"),   
      acousticness:    avg("acousticness"),   
      instrumentalness:avg("instrumentalness"),
      speechiness:     avg("speechiness"),
    };

  
    const avgArtistPopularity = Math.round(
      topArtists.reduce((sum, a) => sum + a.popularity, 0) / topArtists.length
    );
    const obscurity = 100 - avgArtistPopularity; // higher = more obscure

  
    const genreCount = {};
    topArtists.forEach(artist => {
      artist.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });
    const totalGenreMentions = Object.values(genreCount).reduce((a, b) => a + b, 0);
    const genreDNA = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([genre, count]) => ({
        genre,
        pct: Math.round((count / totalGenreMentions) * 100),
      }));

   
    const entropy = -Object.values(genreCount).reduce((sum, count) => {
      const p = count / totalGenreMentions;
      return sum + p * Math.log2(p);
    }, 0);
    const genreEntropy = Math.round((entropy / Math.log2(totalGenreMentions || 1)) * 100);

    
    const uniqueArtistCount = topArtists.length;
    const artistLoyalty = Math.round(100 - (uniqueArtistCount / 50) * 100);

  
    const tempos = audioFeatures.map(t => t.tempo);
    const avgTempo = tempos.reduce((a, b) => a + b, 0) / tempos.length;
    const tempoVariance = Math.round(
      Math.sqrt(tempos.reduce((sum, t) => sum + Math.pow(t - avgTempo, 2), 0) / tempos.length)
    );

   
    const scores = {
      "Midnight Drifter":         (100 - mood.energy) * 0.35 + (100 - mood.valence) * 0.30 + obscurity * 0.20 + genreEntropy * 0.15,
      "Euphoric Maximalist":      mood.energy * 0.40 + mood.valence * 0.30 + mood.danceability * 0.20 + Math.min(avgTempo / 2, 100) * 0.10,
      "Introspective Wanderer":   mood.acousticness * 0.35 + (100 - mood.valence) * 0.25 + mood.speechiness * 0.20 + (100 - obscurity) * 0.20,
      "Chaos Architect":          genreEntropy * 0.45 + tempoVariance * 0.25 + obscurity * 0.20 + genreEntropy * 0.10,
      "Nostalgic Purist":         artistLoyalty * 0.40 + (100 - genreEntropy) * 0.30 + (100 - obscurity) * 0.20 + artistLoyalty * 0.10,
      "Genre Alchemist":          genreEntropy * 0.35 + (genreDNA.length / 6 * 100) * 0.30 + mood.energy * 0.20 + obscurity * 0.15,
      "Frequency Seeker":         obscurity * 0.35 + mood.instrumentalness * 0.30 + mood.energy * 0.20 + (100 - avgArtistPopularity) * 0.15,
      "Cultural Anthropologist":  genreEntropy * 0.35 + (genreDNA.length / 6 * 100) * 0.25 + obscurity * 0.25 + mood.acousticness * 0.15,
    };

    const archetype = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const archetypeScores = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([name, score]) => ({ name, score: Math.round(score) }));

    
    res.json({
      archetype,
      archetypeScores,
      mood,
      obscurity,
      genreDNA,
      genreEntropy,
      artistLoyalty,
      topArtists: topArtists.slice(0, 10).map(a => ({ name: a.name, image: a.images[0]?.url, genres: a.genres })),
      topTracks:  topTracks.slice(0, 10).map(t => ({ name: t.name, artist: t.artists[0].name, image: t.album.images[0]?.url })),
      playlists:  playlists.slice(0, 5).map(p => ({ name: p.name, count: p.tracks.total })),
    });

  } catch (err) {
    console.error("Analysis failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => console.log(`alter.fm backend running on :${port}`));