import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  credential: string;

  @IsString()
  password: string;

  cart?: string;
}
