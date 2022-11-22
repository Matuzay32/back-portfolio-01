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
import { ADMIN } from './ENUMS/admin.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<UserInterface>) {}

  //ENCONTRAR TODOS LOS USUARIOS
  async getAllUsers(): Promise<UserInterface[]> {
    try {
      return await this.userModel.find({});
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

  //ENCONTRAR USUARIO POR ID
  async getOneUserforId(id: string): Promise<UserInterface> {
    try {
      const found = await this.userModel.findById(id);
      return found;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `El usuario con el ${id} no existe`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  //BORRAR USUARIO POR ID
  async deleteOneUserforId(id: string): Promise<UserInterface> {
    try {
      const found = await this.userModel.findByIdAndRemove(id);
      return found;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `El usuario con el ${id} no existe`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //ACTUALIZAR USUARIO POR ID
  async updateOneUserforId(
    id: string,
    userToUpdate: CreateUserDto,
  ): Promise<any> {
    try {
      let { username, password, email, rol } = userToUpdate;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      userToUpdate = { username, password, email, rol };
      console.log(userToUpdate);

      return await this.userModel.findByIdAndUpdate(id, userToUpdate);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `El usuario con el ${id} no existe`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //CREAR USUARIO CON BCRYPT
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    let { username, password, email } = createUserDto;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    try {
      const found = await this.userModel.findOne({ email: email });
      if (found) {
        return {
          usuarioExistente: 'El usuario ya existe',
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

  //LOGIN
  async loginUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const foundAdmin = await this.userModel.findOne({ email: ADMIN.EMAIL });
      if (!foundAdmin) {
        const usuarioAdmin = {
          username: ADMIN.USERNAME,
          password: ADMIN.PASSWORD,
          email: ADMIN.EMAIL,
          rol: ADMIN.ROL,
        };

        let { username, password, email, rol } = usuarioAdmin;

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);

        await this.userModel.create({ username, password: pass, email, rol });
      }

      const { email, password, username } = createUserDto;

      const foundUser = await this.userModel.findOne({ email: email });
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
              rol: foundUser.rol,
            },
            TOKEN_SECRET.TOKEN_SECRET,
            { expiresIn: '1h' },
          );

          return {
            mensaje: 'Usted esta autenticado',
            token: token,
            rol: foundUser.rol,
          };
        } else {
          return { error: 'usuario o contraseña invalido' };
        }
      } else {
        return { error: 'El usuario no existe' };
      }
    } catch (error) {}
  }
}
