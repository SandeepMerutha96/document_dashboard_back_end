import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { userResponse } from './model/user-resonse.model';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){

    }
    @Get()
    async findall(): Promise<User[]> {
        const getUserResponse = await this.userService.findall();
        return getUserResponse;
      }

      @Get(':id')
      async findOne(@Param('id') id: number): Promise<User> {
       const getUserResponse = await this.userService.findOne(id);
        return getUserResponse;
      }

      @Post()
      async create(@Body() user: User): Promise<userResponse> {
        const getUserResponse = await this.userService.create(user);
         return getUserResponse;
       }
       @Put(':id')
       async update(@Param('id') id: number, @Body() user:User): Promise<userResponse> {
        const getUserResponse = await this.userService.update(id,user);
        return getUserResponse;
      }
      
      @Delete(':id')
      async delete(@Param('id') id: number): Promise<string> {
       const getUserResponse = await this.userService.delete(id);
       return getUserResponse;
     }
        

}
