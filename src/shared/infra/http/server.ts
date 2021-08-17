import http from "http";
const debug = require("debug")("nodestr:server");

import app from "@shared/infra/http/app";

debug("ts-express:server");

// PORT // based on express-generator
function normalizePort(val: number | string): number | string | boolean {
  const port: number = typeof val === "string" ? parseInt(val, 10) : val;

  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else return false;
}

const port = normalizePort(process.env.API_PORT || 5100);
app.set("port", port);

// error handler
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);

    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);

    default:
      throw error;
  }
}

// listener handler
function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

// server
const server = http.createServer(app);
server.listen(port, () => console.log(`🚀 Server started on port: ${port}`));
server.on("error", onError);
server.on("listening", onListening);
