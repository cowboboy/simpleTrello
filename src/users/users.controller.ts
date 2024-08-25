import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Column1 } from 'src/columns/entities/column.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Array<User>})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Get the user with specified id" })
  @ApiParam({ name: "id", required: true, description: "user id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update the user with specified id" })
  @ApiParam({ name: "id", required: true, description: "user id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete the user with specified id" })
  @ApiParam({ name: "id", required: true, description: "user id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':id/columns')
  @ApiOperation({ summary: "Get all user columns with specified id" })
  @ApiParam({ name: "id", required: true, description: "user id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Array<Column1>})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findUserColumns(@Param('id') id: string) {
    return this.usersService.findUserColumns(+id);
  }

  @Get(':id/cards')
  @ApiOperation({ summary: "Get all user cards  with specified id" })
  @ApiParam({ name: "id", required: true, description: "user id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Array<Card>})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findUserCards(@Param('id') id: string) {
    return this.usersService.findUserCards(+id);
  }

  @Get(':id/comments')
  @ApiOperation({ summary: "Get all user comments with specified id" })
  @ApiParam({ name: "id", required: true, description: "user id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Array<Comment>})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findUserComments(@Param('id') id: string) {
    return this.usersService.findUserComments(+id);
  }
}
