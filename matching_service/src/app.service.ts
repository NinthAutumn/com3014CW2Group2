import {Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectSlonik, Slonik} from './slonik';
import axios, { AxiosInstance } from 'axios';
import { sql } from 'slonik';
import { config } from 'dotenv';
import { MatchDTO } from './dto/match.dto';
config();
@Injectable()
export class AppService {

  userService: AxiosInstance = null;
  petService: AxiosInstance = null;
  user_petService: AxiosInstance = null;

  constructor(
    @InjectSlonik() private readonly slonik: Slonik,
    private readonly jwtService: JwtService
    ){
      this.userService = axios.create({
        baseURL: process.env.USER_SERVICE_URL,
      });
      this.petService = axios.create({
        baseURL: process.env.PET_SERVICE_URL,
      });
    }
  
  async createMatch(matchDTO: MatchDTO) {

    //function called when user action made.

    const { userId, petId} = matchDTO; 

    //call checkmatched to ensure a match pet isnt already adopted
    //sql used to call user_id, pet_id from the match.
    //and then insert into user_pets with status = 'pending'

    const petMatchID = this.slonik.maybeOne(sql`
    select from pets where pet_id = ${petId}`);

    if (this.checkMatched(petMatchID) == null){
      return this.slonik.maybeOne(sql`
      insert into user_pets (userId, petId, status)
      values(${userId},${petId}, 'pending') returning *`);
    }

    //pending as alternative conditions will be manually completed by shelter
  }

  async checkMatched(petId){
    //checks the pet has not already been adopted
    return this.slonik.maybeOne(sql`
    select * from user_pets where pet_id = ${petId} and status = 'adopted' `)
  }

}
