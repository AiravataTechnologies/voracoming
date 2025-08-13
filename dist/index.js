// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import nodemailer from "nodemailer";
async function registerRoutes(app2) {
  app2.post("/api/subscribe", async (req, res) => {
    try {
      const { email, recipientEmail } = req.body;
      if (!email || !recipientEmail) {
        return res.status(400).json({ error: "Email and recipient email are required" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) || !emailRegex.test(recipientEmail)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      console.log(`\u{1F4E7} Email subscription received:
        User Email: ${email}
        Recipient: ${recipientEmail}
        Timestamp: ${(/* @__PURE__ */ new Date()).toISOString()}
        IP: ${req.ip || req.connection.remoteAddress}`);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "raneaniket23@gmail.com",
          pass: "bacnckysycnwedju"
        }
      });
      const mailOptions = {
        from: '"Coming Soon Page" <raneaniket23@gmail.com>',
        to: recipientEmail,
        subject: "New Email Subscription from Coming Soon Page",
        html: `
          <h2>\u{1F389} New Email Subscription</h2>
          <p>A new user has subscribed for notifications on your Coming Soon page:</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin: 8px 0;"><strong>\u{1F4E7} Email:</strong> ${email}</li>
              <li style="margin: 8px 0;"><strong>\u{1F552} Timestamp:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString()}</li>
              <li style="margin: 8px 0;"><strong>\u{1F310} IP Address:</strong> ${req.ip || req.connection.remoteAddress}</li>
            </ul>
          </div>
          <p>This user will be notified when you launch your website!</p>
          <hr>
          <p style="color: #666; font-size: 12px;">This email was sent automatically from your Coming Soon page subscription system.</p>
        `
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log(`\u2705 Email sent successfully to ${recipientEmail}`);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
      res.json({
        success: true,
        message: "Thank you for subscribing! We'll notify you when we launch."
      });
    } catch (error) {
      console.error("Email subscription error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 4e3;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
