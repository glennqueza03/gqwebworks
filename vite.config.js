import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function apiDevMiddleware() {
  return {
    name: "api-dev-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();

        const url = new URL(req.url, "http://localhost");
        const modulePath = `/api${url.pathname.replace(/^\/api/, "")}.js`;

        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const raw = Buffer.concat(chunks).toString("utf8");
          req.body = raw ? JSON.parse(raw) : {};
        } catch {
          req.body = {};
        }

        req.query = Object.fromEntries(url.searchParams);

        let mod;
        try {
          mod = await server.ssrLoadModule(modulePath);
        } catch (error) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: `No API route at ${url.pathname}` }));
          return;
        }

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
          console.error(`${modulePath} dev handler error:`, error);
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
