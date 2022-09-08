import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class EmailPipe implements PipeTransform {
  async transform(value: string) {
    const isEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value);

    if (!isEmail) {
      throw new BadRequestException("Email not valid");
    }

    return value;
  }
}
