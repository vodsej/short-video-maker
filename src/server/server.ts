import http from "http";
import express from "express";
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { ShortCreator } from "../short-creator/ShortCreator";
import { APIRouter } from "./routers/rest";
import { MCPRouter } from "./routers/mcp";
import { logger } from "../logger";

export class Server {
  private app: express.Application;
  private port: number;
  private shortCreator: ShortCreator;

  constructor(port: number, shortCreator: ShortCreator) {
    this.port = port;
    this.app = express();
    this.shortCreator = shortCreator;

    // add healthcheck endpoint
    this.app.get("/health", (req: ExpressRequest, res: ExpressResponse) => {
      res.status(200).json({ status: "ok" });
    });

    const apiRouter = new APIRouter(shortCreator);
    const mcpRouter = new MCPRouter(shortCreator);
    this.app.use("/api", apiRouter.router);
    this.app.use("/mcp", mcpRouter.router);
  }

  public start(): http.Server {
    return this.app.listen(this.port, (error: unknown) => {
      if (error) {
        logger.error(error, "Error starting server");
        return;
      }
      logger.info(
        { port: this.port, mcp: "/mcp", api: "/api" },
        "MCP and API server is running",
      );
      // todo log instructions
    });
  }

  public getApp() {
    return this.app;
  }
}
