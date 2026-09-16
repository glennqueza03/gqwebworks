import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function apiDevMiddleware() {
  return {
    name: "api-dev-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/api/contact") return next();

        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const raw = Buffer.concat(chunks).toString("utf8");
          req.body = raw ? JSON.parse(raw) : {};
        } catch {
          req.body = {};
        }

        const mod = await server.ssrLoadModule("/api/contact.js");
        const handler = mod.default;

        let statusCode = 200;
        const devRes = {
          setHeader: (key, value) => res.setHeader(key, value),
          status(code) {
            statusCode = code;
            return this;
          },
          json(payload) {
            res.statusCode = statusCode;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(payload));
          },
        };

        try {
          await handler(req, devRes);
        } catch (error) {
          console.error("api/contact.js dev handler error:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Dev server error, see terminal." }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), apiDevMiddleware()],
  };
});
