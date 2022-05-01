import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectSlonik, Slonik } from "./slonik";
import axios, { AxiosInstance } from "axios";
import { sql } from "slonik";
import { config } from "dotenv";
import { MatchDTO } from "./dto/match.dto";
import { AcceptMatchDTO } from "./dto/accept-match.dto";
import { GetNotMatchedDTO } from "./dto/get-not-matched.dto";
config();
@Injectable()
export class AppService {
  userService: AxiosInstance = null;
  petService: AxiosInstance = null;
  user_petService: AxiosInstance = null;
  shelterService: AxiosInstance = null;

  constructor(@InjectSlonik() private readonly slonik: Slonik) {
    this.userService = axios.create({
      baseURL: process.env.USER_SERVICE_URL,
    });
    this.petService = axios.create({
      baseURL: process.env.PET_SERVICE_URL,
    });
    this.shelterService = axios.create({
      baseURL: process.env.SHELTER_SERVICE_URL,
    });
  }

  async createMatch(matchDTO: MatchDTO) {
    //function called when user action made.

    const { userId, petId } = matchDTO;

    //call checkmatched to ensure a match pet isnt already adopted
    //sql used to call user_id, pet_id from the match.
    //and then insert into user_pets with status = 'pending'

    const matched = await this.checkMatched(petId)
    if (!matched) {
      return this.slonik.maybeOne(sql`
      insert into user_pets (user_id, pet_id, status)
      values(${userId},${petId}, 'pending') returning *`);
    }
    //pending as alternative conditions will be manually completed by shelter
  }

  async getMatchedPets(user_id: number) {
    return this.slonik.any(sql`
      select p.*
      from users u
      inner join user_pets up on up.user_id = u.id
      inner join pets p on p.id = up.pet_id
      where u.id = ${user_id}
    `);
  }

  async acceptMatch(acceptMatchDTO: AcceptMatchDTO) {
    const { shelter_user_id, user_id, pet_id, status } = acceptMatchDTO;
    const { data: shelter } = await this.shelterService.get(
      `/shelters/${shelter_user_id}/user`
    );
    const { data: pet } = await this.petService.get(`/pets/${pet_id}`);
    if (shelter.id !== pet.shelter_id) {
      throw new UnauthorizedException();
    }
    await this.slonik.query(sql`
      update user_pets   
        set status = ${status}
      where user_id = ${user_id} and pet_id = ${pet_id}
    `);
  }

  async getPetsForMatching(getNotMatchedDTO: GetNotMatchedDTO) {
    const { limit, user_id, page } = getNotMatchedDTO;
    return this.slonik.any(sql`
      with matched_pets as (
        select p.id
        from pets p 
        inner join user_pets up on up.user_id = ${user_id} and up.pet_id = p.id
      )
      select p.* 
      from pets p
      where not (p.id = any(select * from matched_pets))
      group by p.id
      order by p.created_at desc
      limit ${limit}
      offset ${(page - 1) * limit}
    `);
  }

  async checkMatched(petId) {
    //checks the pet has not already been adopted
    return this.slonik.maybeOne(
      sql`select * from user_pets where pet_id = ${petId} and status = 'adopted' limit 1`
    );
  }
}

