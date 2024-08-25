import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from 'src/cards/entities/card.entity';
import { Column1 } from 'src/columns/entities/column.entity';
import { Comment } from './entities/comment.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    ConfigService,
    JwtService
  ],
  imports: [
    SequelizeModule.forFeature([Card, Column1, Comment])
  ]
})
export class CommentsModule {}
