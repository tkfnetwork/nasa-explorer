import type { Request } from 'express';
import { injectable } from 'inversify';
import type http from 'http';
import type WebSocket from 'ws';
import { WebSocketServer } from 'ws';

import { container } from './di/container';
import { TYPES } from './di/TYPES';

export type WebsocketHandler = (ws: WebSocket, req: Request) => void;

export interface WebsocketRouterInterface {
  register(path: string, handler: WebsocketHandler): void;
  getHandler(path: string): WebsocketHandler | undefined;
}

@injectable()
export class WebsocketRouter {
  private routes = new Map<string, WebsocketHandler>();

  public register(path: string, handler: WebsocketHandler) {
    this.routes.set(path, handler);
  }

  public getHandler(path: string): WebsocketHandler | undefined {
    return this.routes.get(path);
  }
}

export const withWebsockets = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  const wsContainer = container.get<WebsocketRouterInterface>(
    TYPES.WebsocketRouter
  );
  server.on('upgrade', (req, socket, head) => {
    const pathname = new URL(req.url!, `http://${req.headers.host}`).pathname;
    const handler = wsContainer.getHandler(pathname);

    if (!handler) {
      socket.destroy();
      return;
    }

    const wss = new WebSocketServer({ noServer: true });

    wss.handleUpgrade(req, socket, head, (ws) => {
      handler(ws, req as Request);
    });
  });
};
