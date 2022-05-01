import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AppService } from "./app.service";
import { AcceptMatchDTO } from "./dto/accept-match.dto";
import { GetNotMatchedDTO } from "./dto/get-not-matched.dto";
import { MatchDTO } from "./dto/match.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  async health() {
    return true;
  }

  @Post("/")
  @UseGuards(AuthGuard("jwt"))
  async createMatch(@Req() req: any, @Body() body: MatchDTO) {
    body.userId = req.user.user_id;
    return this.appService.createMatch(body);
  }

  @Get("/pets/user")
  @UseGuards(AuthGuard("jwt"))
  async getUserMatches(@Req() req: any) {
    return this.appService.getMatchedPets(req.user.user_id);
  }

  @Get("/pets/not-matched")
  @UseGuards(AuthGuard("jwt"))
  async getUnmatchedPets(
    @Req() req: any,
    @Query() getNotMatchedDTO: GetNotMatchedDTO
  ) {
    getNotMatchedDTO.user_id = req.user.user_id;
    return this.appService.getPetsForMatching(getNotMatchedDTO);
  }

  @Patch("/accept")
  @UseGuards(AuthGuard("jwt"))
  async accepttMatch(@Req() req: any, @Body() acceptMatchDTO: AcceptMatchDTO) {
    acceptMatchDTO.shelter_user_id = req.user.user_id;
    return this.appService.acceptMatch(acceptMatchDTO);
  }

  //write routes here
}
