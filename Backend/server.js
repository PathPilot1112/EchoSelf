import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
const port = process.env.PORT;

const ClientId = process.env.CLIENT_ID;
const RedirectUri = process.env.REDIRECT_URI;

console.log(ClientId);

app.get("/login", (req, res) => {
  const rootUrl = "https://accounts.spotify.com/authorize";
  const options = {
    client_id: ClientId,
    redirect_uri: RedirectUri,
    response_type: "code",
    scope:
      "playlist-read-private user-follow-read user-top-read user-follow-read user-library-read user-read-email user-read-playback-state",
    state: "let-try-this-echoself",
  };

  const queryString = new URLSearchParams(options).toString();
  res.redirect(`${rootUrl}?${queryString}`);
});

app.get("/auth/callback", async (req, res) => {
  const { code, state } = req.query;
  if (state !== "let-try-this-echoself") {
    res.status(502).send("Someone else is try to enter the system");
  }

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json"
         },
      },
    );

    const { access_token, scope } = tokenResponse.data;

    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.redirect("http://localhost:5173/loading");
    console.log(userResponse);

    const topartistResponse = await axios.get("https://api.spotify.com/v1/me/top/artists",{
        headers:{Authorization:`Bearer ${access_token}`}
    });
    console.log(topartistResponse);

    const topTracksResponse = await axios.get("https://api.spotify.com/v1/me/top/tracks",{
        headers:{Authorization:`Bearer ${access_token}`}
    });
    console.log(topTracksResponse);

    const playlist = await axios.get("https://api.spotify.com/v1/me/playlists",{
        headers:{Authorization:`Bearer ${access_token}`}
    });

    console.log(playlist);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
