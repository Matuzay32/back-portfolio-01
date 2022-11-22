import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Patch,
  Param,
  Query,
  Res,
  Req,
  HttpStatus,
  HttpCode,
  HttpException,
  NotFoundException,
  Body,
  UploadedFiles,
  UseInterceptors,
  HttpVersionNotSupportedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from './users.service';
import { UserInterface } from './interfaces/users.interface';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //ENCONTRAR TODOS LOS USUARIOS
  @Get()
  getAllUsers(): Promise<UserInterface[]> {
    return this.userService.getAllUsers();
  }

  //ENCONTRAR USUARIOS POR ID
  @Get(':id')
  getOneUserforId(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.getOneUserforId(id);
  }

  //BORRAR USUARIO POR ID
  @Delete(':id')
  deleteOneUserforId(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.deleteOneUserforId(id);
  }

  //ACTUALIZAR USUARIO POR ID
  @Put(':id')
  updateOneUserforId(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserInterface> {
    return this.userService.updateOneUserforId(id, createUserDto);
  }

  //CREAR USUARIO
  @Post()
  createCar(@Body() createUserDto: CreateUserDto): Promise<UserInterface> {
    return this.userService.createUser(createUserDto);
  }

  //LOGIN USUARIO
  @Post('/login')
  loginUser(@Body() createUserDto: CreateUserDto): Promise<UserInterface> {
    return this.userService.loginUser(createUserDto);
  }
}
