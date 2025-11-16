import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: "app",
      filename: "HostApp.js",
      exposes: {
        "./Test": "./src/page/Test.jsx",
        "./UserCard": "./src/components/UserCard.jsx"
      },
      remotes: {
        AuthApp: "https://wih-auth-app.vercel.app/assets/AuthApp.js",
        SubApp: "https://wih-subsription-app.vercel.app/assets/SubApp.js",
        HomeApp: "https://wih-home-app.vercel.app/assets/HomeApp.js",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
        "react-router-dom": { singleton: true, eager: true },
      },
    }),
    {
      name: "vite-plugin-reload-endpoint",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/__fullReload") {
            server.hot.send({ type: "full-reload" });

            res.end("Full reload triggered");
          } else {
            next();
          }
        });
      },
    },
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
