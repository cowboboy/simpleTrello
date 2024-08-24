import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Column1 } from 'src/columns/entities/column.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService, ConfigService],
  imports: [
    SequelizeModule.forFeature([User, Card, Column1, Comment]),
  ],
  exports: [UsersService]
})
export class UsersModule {}
