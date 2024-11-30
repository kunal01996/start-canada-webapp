/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'next-connect' {
  import { IncomingMessage, ServerResponse } from 'http';

  // Define types for middleware
  type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

  interface NextConnectOptions {
    onError?: (err: Error, req: IncomingMessage, res: ServerResponse, next: (err?: any) => void) => void;
    onNoMatch?: (req: IncomingMessage, res: ServerResponse) => void;
  }

  type NextConnectHandler = (req: IncomingMessage, res: ServerResponse) => void;

  function nextConnect(options?: NextConnectOptions): {
    use: (middleware: Middleware) => NextConnectHandler;
    handle: (req: IncomingMessage, res: ServerResponse) => void;
    [key: string]: any;  // This still remains for dynamic properties, but it can be further refined if needed
  };

  // Update default export to a named export
  export = nextConnect;
}
