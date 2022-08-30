import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { genSalt, hash } from "bcryptjs";
import { Repository } from "typeorm";
import { RegisterUserDto } from "@/users/users.dto";
import { UsersEntity } from "@/users/users.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>
  ) {}

  async registerUser(body: RegisterUserDto): Promise<UsersEntity> {
    const { email, password } = body;
    const user = await this.usersRepository.findOneBy({ email });

    if (user) {
      throw new ConflictException("Email alredy exists");
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = this.usersRepository.save({ email, password: hashedPassword });
    return newUser;
  }
}
