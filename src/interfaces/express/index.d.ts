// import IQueryFeatures from "../queryFeatures.interface";
import * as express from "express";

// // to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      queryFeatures?: object;
    }
  }
}
