import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ARCHETYPE_META = {
  "Midnight Drifter":        { badge: "INTP-SONIC", color: "#7B2FFF", light: "#D4B8FF" },
  "Euphoric Maximalist":     { badge: "ENFP-SONIC", color: "#FF4D4D", light: "#FFD0D0" },
  "Introspective Wanderer":  { badge: "INFJ-SONIC", color: "#3B82F6", light: "#BFDBFE" },
  "Chaos Architect":         { badge: "ENTP-SONIC", color: "#F97316", light: "#FED7AA" },
  "Nostalgic Purist":        { badge: "ISTJ-SONIC", color: "#FFAA00", light: "#FEF3C7" },
  "Genre Alchemist":         { badge: "INTJ-SONIC", color: "#10B981", light: "#A7F3D0" },
  "Frequency Seeker":        { badge: "ISTP-SONIC", color: "#8B5CF6", light: "#DDD6FE" },
  "Cultural Anthropologist": { badge: "ENFJ-SONIC", color: "#EC4899", light: "#FBCFE8" },
};

const ALTER_EGO_MAP = {
  "Midnight Drifter":        "Four Tet at 4am",
  "Euphoric Maximalist":     "Skrillex b2b Four Tet",
  "Introspective Wanderer":  "Phoebe Bridgers in a car at dusk",
  "Chaos Architect":         "Arca producing a Carly Rae Jepsen album",
  "Nostalgic Purist":        "Noel Gallagher, unironically",
  "Genre Alchemist":         "Floating Points with an orchestra",
  "Frequency Seeker":        "DJ Stingray in a dark room",
  "Cultural Anthropologist": "Bonobo travelling without a map",
};

const MoodBar = ({ label, value, color }) => (
  <div className="mb-2">
    <div className="flex justify-between items-center mb-1">
      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "9px", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </span>
      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "9px", color: "#aaa" }}>{value}%</span>
    </div>
    <div style={{ height: "6px", background: "#1A1A1A", border: "1.5px solid #333", position: "relative" }}>
      <div
        className="mood-bar-fill"
        style={{ height: "100%", background: color, width: "0%", transition: "width 0.6s ease-out" }}
        data-target={value}
      />
    </div>
  </div>
);

const GenreBar = ({ genre, pct, color }) => (
  <div className="flex items-center gap-2 mb-1.5">
    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", color: "#666", width: "72px", flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {genre.slice(0, 8)}
    </span>
    <div style={{ flex: 1, height: "10px", background: "#1A1A1A", border: "1.5px solid #333" }}>
      <div
        className="genre-bar-fill"
        style={{ height: "100%", background: color, width: "0%", transition: "width 0.6s ease-out 0.2s" }}
        data-target={pct}
      />
    </div>
    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", fontWeight: 600, color: "#ccc", width: "28px", textAlign: "right" }}>
      {pct}%
    </span>
  </div>
);

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // data from /analyse — fall back to demo data so page still renders
  const data = location.state || {
    archetype: "Midnight Drifter",
    archetypeScores: [],
    mood: { energy: 28, valence: 35, danceability: 54, acousticness: 71, instrumentalness: 44 },
    obscurity: 81,
    genreDNA: [
      { genre: "Indie", pct: 38 },
      { genre: "Electronic", pct: 29 },
      { genre: "Jazz", pct: 18 },
      { genre: "Ambient", pct: 15 },
    ],
    topArtists: [],
    topTracks: [],
  };

  const meta = ARCHETYPE_META[data.archetype] || ARCHETYPE_META["Midnight Drifter"];
  const alterEgo = ALTER_EGO_MAP[data.archetype] || "Unknown";
  const GENRE_COLORS = [meta.color, "#FF4D4D", "#FFAA00", "#C8C8C8", "#10B981", "#3B82F6"];

  // animate bars after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll(".mood-bar-fill, .genre-bar-fill").forEach((el) => {
        el.style.width = el.dataset.target + "%";
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const html2canvas = (await import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.esm.js")).default;
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true, backgroundColor: "#0A0A0A" });
      const link = document.createElement("a");
      link.download = `alter-fm-${data.archetype.toLowerCase().replace(/\s/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error(e);
    }
    setDownloading(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "My EchoSelf persona", text: `I'm a ${data.archetype} on EchoSelf — find out your music persona!`, url: window.location.origin });
    } else {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full font-grotesk" style={{ background: "#F5F0FF" }}>

      {/* NAV */}
      <nav className="w-full border-b-4 border-black bg-white flex items-center justify-between px-8 py-3" style={{ height: "56px" }}>
        <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          ALTER<span style={{ color: meta.color }}>.FM</span>
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="border-2 border-black px-4 py-1.5 text-sm font-bold bg-white hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5 transition-transform"
            style={{ fontFamily: "Space Grotesk, sans-serif", boxShadow: "2px 2px 0 #0A0A0A" }}
          >
            ↺ RETRY
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <p style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", color: meta.color, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px" }}>
            YOUR SONIC IDENTITY
          </p>
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#0A0A0A" }}>
            {data.archetype}
          </h1>
        </div>

        {/* MAIN GRID: card left, actions right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── SHARE CARD ── */}
          <div
            ref={cardRef}
            id="share-card"
            style={{
              width: "360px",
              minWidth: "360px",
              background: "#0A0A0A",
              border: "3px solid #0A0A0A",
              boxShadow: "6px 6px 0 #0A0A0A",
              fontFamily: "Space Grotesk, sans-serif",
              flexShrink: 0,
            }}
          >
            {/* Card header */}
            <div style={{ padding: "18px 18px 14px", borderBottom: "2px solid #2A2A2A" }}>
              <div className="flex justify-between items-start">
                <div>
                  <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>
                    YOUR ARCHETYPE
                  </span>
                  <div className="font-bold leading-tight" style={{ fontSize: "22px", color: "#fff" }}>
                    {data.archetype}
                  </div>
                </div>
                <div style={{ background: meta.color, border: `2px solid ${meta.light}`, padding: "4px 10px", fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0, marginTop: "4px" }}>
                  {meta.badge}
                </div>
              </div>
            </div>

            {/* Mood spectrum */}
            <div style={{ padding: "12px 18px", borderBottom: "2px solid #2A2A2A" }}>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "9px", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
                MOOD SPECTRUM
              </div>
              <MoodBar label="Energy"       value={data.mood.energy}       color={meta.color} />
              <MoodBar label="Valence"      value={data.mood.valence}      color="#FF4D4D"    />
              <MoodBar label="Danceability" value={data.mood.danceability} color="#FFAA00"    />
              <MoodBar label="Acousticness" value={data.mood.acousticness} color="#3B82F6"    />
            </div>

            {/* Genre DNA */}
            <div style={{ padding: "12px 18px", borderBottom: "2px solid #2A2A2A" }}>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "9px", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
                GENRE DNA
              </div>
              {data.genreDNA.slice(0, 4).map((g, i) => (
                <GenreBar key={g.genre} genre={g.genre} pct={g.pct} color={GENRE_COLORS[i]} />
              ))}
            </div>

            {/* Obscurity + top track mini row */}
            <div style={{ padding: "10px 18px", borderBottom: "2px solid #2A2A2A" }} className="flex gap-4">
              <div style={{ flex: 1, border: "1.5px solid #333", padding: "8px 10px", background: "#111" }}>
                <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "9px", color: "#666", textTransform: "uppercase", letterSpacing: "0.06em" }}>OBSCURITY</div>
                <div className="font-bold" style={{ fontSize: "20px", color: meta.light, marginTop: "2px" }}>{data.obscurity}<span style={{ fontSize: "11px", color: "#555" }}>/100</span></div>
              </div>
              <div style={{ flex: 1, border: "1.5px solid #333", padding: "8px 10px", background: "#111" }}>
                <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "9px", color: "#666", textTransform: "uppercase", letterSpacing: "0.06em" }}>API STATUS</div>
                <div className="font-bold" style={{ fontSize: "13px", color: "#1DB954", marginTop: "4px" }}>STABLE</div>
              </div>
            </div>

            {/* Alter ego footer */}
            <div style={{ padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "9px", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>MUSIC ALTER EGO</div>
                <div className="font-bold" style={{ fontSize: "14px", color: meta.light, marginTop: "3px", lineHeight: 1.3 }}>{alterEgo}</div>
              </div>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", color: "#1DB954", letterSpacing: "0.06em" }}>SPOTIFY ✦</div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: actions + top tracks ── */}
          <div className="flex-1 flex flex-col gap-4 w-full">

            {/* Action buttons */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full font-bold text-sm py-3.5 px-6 border-4 border-black flex items-center justify-center gap-2 transition-transform active:translate-x-1 active:translate-y-1"
              style={{ background: meta.color, color: "#fff", boxShadow: "4px 4px 0 #0A0A0A", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.04em" }}
            >
              {downloading ? "GENERATING..." : "↓ SAVE AS IMAGE"}
            </button>

            <button
              onClick={handleShare}
              className="w-full font-bold text-sm py-3 px-6 border-4 border-black flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition-transform active:translate-x-1 active:translate-y-1"
              style={{ boxShadow: "4px 4px 0 #0A0A0A", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.04em" }}
            >
              {copied ? "✓ LINK COPIED" : "⬡ SHARE RESULT"}
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full font-bold text-sm py-3 px-6 border-4 border-dashed border-black flex items-center justify-center gap-2 bg-transparent hover:bg-white/50 transition-transform"
              style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.04em", color: "#666" }}
            >
              ↺ REGENERATE
            </button>

            {/* Archetype scores */}
            {data.archetypeScores?.length > 0 && (
              <div className="border-4 border-black p-4 bg-white" style={{ boxShadow: "4px 4px 0 #0A0A0A" }}>
                <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: "12px" }}>
                  ARCHETYPE SPECTRUM
                </div>
                {data.archetypeScores.slice(0, 5).map((a, i) => (
                  <div key={a.name} className="flex items-center gap-3 mb-2">
                    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", color: i === 0 ? meta.color : "#888", width: "160px", flexShrink: 0, fontWeight: i === 0 ? 700 : 400 }}>
                      {a.name}
                    </span>
                    <div className="flex-1 h-2 border border-black bg-gray-100 relative">
                      <div style={{ height: "100%", background: i === 0 ? meta.color : "#C8C8C8", width: `${Math.round((a.score / data.archetypeScores[0].score) * 100)}%` }} />
                    </div>
                    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", color: "#888", width: "28px", textAlign: "right" }}>
                      {a.score}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Top artists */}
            {data.topArtists?.length > 0 && (
              <div className="border-4 border-black p-4 bg-white" style={{ boxShadow: "4px 4px 0 #0A0A0A" }}>
                <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: "12px" }}>
                  TOP ARTISTS
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.topArtists.slice(0, 8).map((a) => (
                    <div key={a.name} className="flex items-center gap-2 border-2 border-black px-3 py-1.5" style={{ boxShadow: "2px 2px 0 #0A0A0A" }}>
                      {a.image && <img src={a.image} alt="" className="w-6 h-6 object-cover border border-black" />}
                      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", fontWeight: 600 }}>{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top tracks */}
            {data.topTracks?.length > 0 && (
              <div className="border-4 border-black p-4 bg-white" style={{ boxShadow: "4px 4px 0 #0A0A0A" }}>
                <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: "12px" }}>
                  TOP TRACKS
                </div>
                {data.topTracks.slice(0, 5).map((t, i) => (
                  <div key={t.name} className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-0">
                    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", color: "#aaa", width: "16px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t.image && <img src={t.image} alt="" className="w-8 h-8 object-cover border-2 border-black" />}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{t.name}</div>
                      <div style={{ fontSize: "11px", color: "#888", fontFamily: "IBM Plex Mono, monospace" }}>{t.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ARCHETYPE PILL ROW */}
        <div className="mt-10">
          <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: "12px" }}>
            ALL ARCHETYPES
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.keys(ARCHETYPE_META).map((name) => {
              const isActive = name === data.archetype;
              const m = ARCHETYPE_META[name];
              return (
                <div
                  key={name}
                  style={{
                    border: "3px solid #0A0A0A",
                    padding: "6px 14px",
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: isActive ? m.color : "#fff",
                    color: isActive ? "#fff" : "#0A0A0A",
                    boxShadow: isActive ? `3px 3px 0 #0A0A0A` : "2px 2px 0 #C8C8C8",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {name}
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-16 border-t-4 border-black pt-4 flex justify-between items-center">
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", color: "#aaa" }}>
            ALTER.FM · POWERED BY SPOTIFY API · NOT AFFILIATED WITH SPOTIFY
          </span>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", color: meta.color }}>
            {meta.badge}
          </span>
        </div>
      </div>
    </div>
  );
}