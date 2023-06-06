import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post, Put, Res
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("User")
@ApiBearerAuth('defaultBearerAuth')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    public async create(@Body() body: CreateUserDto, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0))
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send("Missing some information.");

        const user = await this.userService.create(body);

        if (user) {
            return res.status(HttpStatus.CREATED).send();
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

    @Get()
    public async getUsers(@Res() res) {
       return  await this.userService.findAll();
     //   return res.status(HttpStatus.OK).json(users);
    }

    @Get(":id")
    public async getUser(@Param("id") id: string, @Res() res) {
        const users = await this.userService.findById(id);

        return res.status(HttpStatus.OK).json(users);
    }

    @Put(":id")
    public async update(@Param("id") id: string, @Body() body: UpdateUserDto, @Res() res) {
        // console.log('id',id);
        // if (user.id !== user.userId)
        //   return res
        //     .status(HttpStatus.NOT_FOUND)
        //     .send("Unable to find the entry.");
        await this.userService.update(id, body);

        return res.status(HttpStatus.NO_CONTENT).send();

        // if (updatedUser) {
        //   return res.status(HttpStatus.NO_CONTENT).send();
        // } else {
        //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        // }
    }

    @Delete(":id")
    public async delete(@Param("id") id: string, @Res() res) {
        //   if (user.id !== user.userId)
        //     return res
        //       .status(HttpStatus.NOT_FOUND)
        //       .send("Unable to find the entry.");

        await this.userService.delete(id);
        return res.status(HttpStatus.NO_CONTENT).send();
        //TODO need to fix this.
        // if (deletedUser) {
        // } else {
        //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        // }
    }
}
