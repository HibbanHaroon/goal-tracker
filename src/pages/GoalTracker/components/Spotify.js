import React from "react";

function Spotify() {
  return (
    <iframe
      title="Spotify Embed: Dark Theme Playlist "
      src={`https://open.spotify.com/embed/playlist/64Ym3TKPulr3IT39dKTwHa?utm_source=generator&theme=0`}
      width="95%"
      height="100%"
      style={{ minHeight: "360px", marginTop: "12px" }}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}

export default Spotify;
