import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  async registerUser(): Promise<string> {
    return "Register user";
  }
}
