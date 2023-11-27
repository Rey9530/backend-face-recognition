import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Auth, GetUser } from 'src/users/decorators';
import { CreateAuthDto, CreateUserDto, UpdateUserDto } from './dto';
import { marca_usr_usuario } from '@prisma/client';
// import { MarcaUsrUsuario } from './entities/user.entity';


@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post('login')
  loginUser(@Body() loginUserDto: CreateAuthDto) {
    return this.usersService.login(loginUserDto);
  }


  @Get('check-status')
  @Auth()
  checkStatus(@GetUser() user: marca_usr_usuario) {
    return this.usersService.checkStatus(user);
  }


  @Post()
  @Auth()
  create(
    @Body() createUserDto: CreateUserDto,
    @GetUser() user: marca_usr_usuario
  ) {
    return this.usersService.create(createUserDto, user);
  } 
  // create2(
  //   @Body() createUserDto: CreateUserDto, 
  // ) {
  //   return this.usersService.create2(createUserDto);
  // }

  @Get()
  @Auth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(`${id}`);
  }

  @Put(':id')
  @Auth()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(`${id}`, updateUserDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(`${id}`);
  }
}
