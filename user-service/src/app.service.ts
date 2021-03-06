import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectSlonik, Slonik, SlonikModule } from './slonik';
import { compare, genSalt, hash } from 'bcryptjs';
import { sql } from 'slonik';
import { CreateUserDTO } from './dto/creat-user.dto';
import { LoginDTO } from './dto/login.dto';
import { NotFoundError } from 'rxjs';
import { config } from 'dotenv';
config();
@Injectable()
export class AppService {
  constructor(@InjectSlonik() private readonly slonik: Slonik) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const { username, email, password } = createUserDTO;
    const user = await this.slonik.maybeOne(sql`
        insert into users(username,email,password,created_at,updated_at)
        values(${username},${email},${await this.encryptPassword(
      password,
    )},now(),now()) returning * 
      `);
    delete user.password;
    return user;
  }

  async isUsernameTaken(username: string) {
    return {
      taken: !!(await this.slonik.maybeOne(
        sql`select * from users where username ilike ${username}`,
      )),
    };
  }
  async isEmailTaken(email: string) {
    return {
      taken: !!(await this.slonik.maybeOne(
        sql`select * from users where email ilike ${email}`,
      )),
    };
  }

  async findUserById(user_id: number) {
    const user = await this.slonik.one(sql`
      select u.*
      from users u
      where u.id = ${user_id} 
      group by u.id
    `);
    delete user.password;
    return user;
  }

  async findUserByCredentials(credential: string) {
    return this.slonik.maybeOne(
      sql`
      select u.*
      from users u
      where u.email ilike ${credential} or u.username ilike ${credential}`,
    );
  }

  async changeUserPassword(user_id: number, password: string) {
    return this.slonik.maybeOne(
      sql`update users set password = ${await this.encryptPassword(
        password,
      )} where id = ${user_id} returning * `,
    );
  }

  async loginHandler(loginDTO: LoginDTO) {
    const { credential, password } = loginDTO;
    const user = (await this.findUserByCredentials(credential)) as any;
    if (!user) throw new NotFoundException('User not found');
    if (await this.verifyPassword(password, user.password)) {
      delete user.password;
      return user;
    } else {
      throw new ForbiddenException(
        'Wrong password combination with the username',
      );
    }
  }

  async encryptPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async verifyPassword(
    password: string,
    hashed_password: string,
  ): Promise<Boolean> {
    return compare(password, hashed_password);
  }
}
