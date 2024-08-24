import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from 'src/cards/entities/card.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Card) private readonly cardModel: typeof Card,
    @InjectModel(Comment) private readonly commentModel: typeof Comment,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create({...createUserDto});
    const result = {
      id: newUser.id,
      email: newUser.email
    }
    return result
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findOne({
      where: {
        id
      }
    });
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({
      where: {
        email
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userModel.update({...updateUserDto}, {where: {id}});
  }

  async remove(id: number) {
    const user = await this.userModel.findOne({
      where: {
        id
      }
    })
    return await user.destroy();
  }

  async findUserColumns(id: number) {
    return
  }

  async findUserCards(id: number) {
    return
  }

  async findUserComments(id: number) {
    return
  }
}
