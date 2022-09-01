import { Request } from "express";

export type JWTPayload = {
  id: number;
};

export type PayloadRequest = {
  user: JWTPayload;
} & Request;
