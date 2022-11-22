import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';

import {
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { UserInterface } from './interfaces/users.interface';
import { TOKEN_SECRET } from './ENUMS/secret.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<UserInterface>) {}

  //FIND ALL USERS
  async getAllUsers(query): Promise<UserInterface[]> {
    const { limit, offset } = query;

    try {
      return await this.userModel.find({}).limit(limit).skip(offset);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Users not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //FIND USER FOR NAME
  async getUsersWithName(query): Promise<UserInterface[]> {
    const { name, limit, offset, sort } = query;

    try {
      return await this.userModel
        .find({
          $or: [
            { email: { $regex: name, $options: 'i' } },
            { username: { $regex: name, $options: 'i' } },
          ],
        })
        .limit(limit)
        .sort({ price: sort })
        .skip(offset);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Users not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //FIND USER FOR ID
  async getOneUserforId(id: string): Promise<UserInterface> {
    try {
      const found = await this.userModel.findById(id);
      return found;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with id ${id} does not exist`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  //DELETE CAR FOR ID
  async deleteOneUserforId(id: string): Promise<UserInterface> {
    try {
      const found = await this.userModel.findByIdAndRemove(id);
      return found;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //UPDATE USER FOR ID
  async updateOneUserforId(
    id: string,
    userToUpdate: CreateUserDto,
  ): Promise<any> {
    try {
      return await this.userModel.findByIdAndUpdate(id, userToUpdate);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //CREATE USER CON Bcrypt
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    let { username, password, email } = createUserDto;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    try {
      const found = await this.userModel.findOne({ email: email });
      if (found) {
        return {
          thisUserIsRegistered: 'This user already exists',
        };
      } else if (!found) {
        const userCreated = await this.userModel.create({
          username,
          password,
          email,
        });
        const { username: user, email: mail, _id: id } = userCreated;
        return { user, mail, id };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //login
  async loginUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { email, password, username } = createUserDto;
      const foundUser = await this.userModel.findOne({ email: email });
      // console.log(foundUser);
      if (foundUser) {
        const validPassword = await bcrypt.compare(
          password,
          foundUser.password,
        );
        if (validPassword && foundUser.username == username) {
          //Genero el Token con los datos del usuario que vienen desde la base de datos
          const token = sign(
            {
              username: foundUser.username,
              email: foundUser.email,
              _id: foundUser._id,
              // role: foundUser.role,
            },
            TOKEN_SECRET.TOKEN_SECRET,
            { expiresIn: '1h' },
          );

          return { message: 'You are now authenticated', token: token };
        } else {
          return { error: 'Invalid Password or User' };
        }
      } else {
        return { error: 'User does not exist' };
      }
    } catch (error) {}
  }
}
