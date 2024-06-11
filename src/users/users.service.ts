import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import { userResponse } from './model/user-resonse.model';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findall(): Promise<User[]> {
  const allUsers = await this.usersRepository.find();
    if (allUsers) {
      return allUsers;
    } else {
      throw new BadRequestException(`Some error while fetching users list`);
      
    }
  }
  async findOne(id: number): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { id } });
    if (existingUser) {
      return existingUser;
    } else {
      throw new BadRequestException(`User with id : ${id} not found`);
      
    }
  }
  async create(user: User): Promise<userResponse> {
    const alreadyExist = await this.usersRepository.find({ where: [{ email: user.email }, { phoneNumber: user.phoneNumber }] });
    if (alreadyExist.length>0) {
      throw new BadRequestException(`User with email ${user.email} or phone number ${user.phoneNumber} already exists`);
      // return  (`${user.email}` +'  already exists');
    }
    const newUser = this.usersRepository.create(user);
    const savedUser = await this.usersRepository.save(newUser);
    return { user: savedUser, message: 'New user added successfully' };
  }

  async update(id: number, user: User): Promise<userResponse> {
    const existingUser = await this.usersRepository.findOne({ where: { id } });
    if (existingUser) {
      this.usersRepository.merge(existingUser, user);
       await this.usersRepository.save(existingUser);
      return { user :existingUser, message:" User Update success" }
    } else {
     
      throw new BadRequestException(`User with id : ${id} not found`);
    }
  }
  async delete(id: number): Promise<string> {
    const existingUser = await this.usersRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
    await this.usersRepository.delete(id);

    return `User with id : ${id} delete successfully`;
  }
}
