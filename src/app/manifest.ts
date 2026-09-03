import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aevion Studio — Elite Technology & AI Systems Studio",
    short_name: "Aevion Studio",
    description: "An elite technology studio building autonomous AI systems, resilient software products, high-performance web experiences, and experimental digital architectures.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/aevion-mark.png",
        sizes: "470x365",
        type: "image/png",
      },
    ],
  };
}
