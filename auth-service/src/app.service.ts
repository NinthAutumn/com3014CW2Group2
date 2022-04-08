import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import axios, { AxiosInstance } from 'axios';
import { config } from 'dotenv';
import { CreateUserDTO } from './dto/creat-user.dto';
config();
@Injectable()
export class AppService {
  userService: AxiosInstance = null;
  emailService: AxiosInstance = null;
  
  constructor(private readonly jwtService: JwtService) {
    this.userService = axios.create({
      baseURL: process.env.USER_SERVICE_URL,
    });
    this.emailService = axios.create({
      baseURL: process.env.EMAIL_SERVICE_URL,
    });
  }

  async logIn(loginDTO: LoginDTO) {
    const { credential, password } = loginDTO;
    // const user = await this.usersService.findUserByCredential(credential);
    // await this.usersService.verifyPassword(password, user.password)

    const { data: user } = await this.userService.post(`/login`, loginDTO, {});

    if (user) {
      // delete user.password;
      return { token: await this.createJWTToken(user), user };
    } else {
      throw new ForbiddenException();
    }
  }

  async resetRequestHandler(credential: string) {
    const { data: user } = await this.userService.get(
      `/credentials/${credential}`,
      {
        headers: {
          Authorization: `Bearer ${await this.generateServiceToken('auth')}`,
        },
      },
    );

    if (user) {
    }
  }

  async generateServiceToken(name) {
    return this.jwtService.sign({ service: name }, { expiresIn: 800000 });
  }

  async resetPasswordHandler(user: any, password: string) {
    if (!user.verify) {
      return { error: 'Invalid JWT Token' };
    }

    return this.userService.patch('/password', {
      password: password,
    });
  }

  async registerHandler(createUserDTO: CreateUserDTO) {
    const { data: user } = await this.userService.post(
      `/user`,
      createUserDTO,
      {},
    );
    if (user) {
      await this.emailService.post(
        `/send/auth/verify`,
        {
          email: user.email,
          token: await this.createJWTToken({ user_id: user.id, verify: true }),
        },
        {
          headers: {
            Authorization: `Bearer ${await this.generateServiceToken('auth')}`,
          },
        },
      );
      return { token: await this.createJWTToken({ user_id: user.id }), user };
    } else {
      throw new ForbiddenException();
    }
  }

  async createJWTToken(payload: any, time: number = 60 * 15) {
    // console.log(process.env.JWT_SECRET);
    return await this.jwtService.sign(payload, {
      expiresIn: time,
    });
  }

  async verifyJWTToken(token: string) {
    return this.jwtService.verify(token);
  }
}
