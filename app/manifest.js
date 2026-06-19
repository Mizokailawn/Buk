export default function manifest() {
  return {
    id: "/",
    name: "BUK",
    short_name: "BUK",
    description: "Buy and sell used vehicles",

    start_url: "/",
    scope: "/",

    display: "standalone",
    orientation: "portrait",

    categories: ["marketplace", "automotive"],

    lang: "en",

    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}