import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JTWAuthGuard extends AuthGuard("jwt") {}
