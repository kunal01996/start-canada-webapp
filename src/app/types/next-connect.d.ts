declare module 'next-connect' {
  import { IncomingMessage, ServerResponse } from 'http';

  interface NextConnectOptions {
    onError?: (err: any, req: IncomingMessage, res: ServerResponse, next: Function) => void;
    onNoMatch?: (req: IncomingMessage, res: ServerResponse) => void;
  }

  type NextConnectHandler = (req: IncomingMessage, res: ServerResponse) => void;

  function nextConnect(options?: NextConnectOptions): {
    use: (middleware: any) => NextConnectHandler;
    handle: (req: IncomingMessage, res: ServerResponse) => void;
    [key: string]: any;
  };

  // Update default export to a named export
  export = nextConnect;
}
