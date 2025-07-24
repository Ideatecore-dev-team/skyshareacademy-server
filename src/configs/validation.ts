import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny, z } from "zod";

export const validate = {
  body:
    (schema: ZodTypeAny) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      try {
        // console.log(req.body);
        schema.parse(req.body);
        next();
      } catch (error) {
        next(error);
      }
    },

  params:
    (schema: ZodTypeAny) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      try {
        // console.log(req.params);
        schema.parse(req.params);
        next();
      } catch (error) {
        next(error);
      }
    },

  query:
    (schema: ZodTypeAny) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      try {
        // console.log(req.query);
        schema.parse(req.query);
        next();
      } catch (error) {
        next(error);
      }
    },

  response: (schema: ZodTypeAny, data: object): z.infer<ZodTypeAny> => {
    return schema.parse(data);
  },
};
