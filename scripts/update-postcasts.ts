import fs from "fs";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  Bun.env;

type Show = {
  id: string;
  name: string;
  publisher: string;
  description: string;
  images: { url: string; width: number; height: number }[];
  external_urls: { spotify: string[] };
};

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
          "base64",
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description);
  return data.access_token;
}

async function updatePodcasts() {
  const token = await getAccessToken();

  const res = await fetch("https://api.spotify.com/v1/me/shows", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error("Spotify API failed:", res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();
  const podcasts = data.items.map((i: Record<string, Show>) => {
    const images = (i.show?.images || []).sort((a, b) => a.width - b.width);

    return {
      id: i.show.id,
      name: i.show.name,
      publisher: i.show.publisher,
      description: i.show.description,
      cover: {
        sm: i.show.images?.[0]?.url,
        md: i.show.images?.[1]?.url,
        lg: i.show.images?.[images.length - 1]?.url,
      },
      url: i.show.external_urls.spotify,
      lastUpdated: new Date().toISOString(),
    };
  });

  fs.writeFileSync(
    "./src/data/podcasts.json",
    JSON.stringify(podcasts, null, 2),
  );

  console.log(`✅ Updated ${podcasts.length} podcasts`);
}

updatePodcasts().catch((err) => {
  console.error(err);
  process.exit(1);
});
