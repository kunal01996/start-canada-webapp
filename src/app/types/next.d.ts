// types/next.d.ts

import { NextApiRequest as OriginalNextApiRequest } from 'next';
import { File } from 'multer';

declare module 'next' {
  export interface NextApiRequest extends OriginalNextApiRequest {
    file?: File;  // Add 'file' property to NextApiRequest, which is an optional property of type 'File' from multer
  }
}
