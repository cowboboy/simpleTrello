import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';
import { Column1 } from 'src/columns/entities/column.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from 'src/cards/entities/card.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Column1) private readonly column1Model: typeof Column1,
    @InjectModel(Card) private readonly cardModel: typeof Card,
    @InjectModel(Comment) private readonly commentModel: typeof Comment
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentModel.create({
      ...createCommentDto
    })
    return newComment;
  }

  async findAll() {
    return await this.commentModel.findAll();
  }

  async findOne(id: number, user: JwtPayload) {
    await this.checkAuthor(id, user)
    
    return await this.column1Model.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, user: JwtPayload) {
    await this.checkAuthor(id, user)

    return await this.column1Model.update({...updateCommentDto}, {
      where: {
        id
      }
    })
  }

  async remove(id: number, user: JwtPayload) {
    await this.checkAuthor(id, user)

    return await this.commentModel.destroy({
      where: {
        id
      }
    });
  }

  async checkAuthor(id: number, user: JwtPayload) {
    const comment = await this.commentModel.findOne({
      where: 
      {
        id
      }
    })

    if (!comment) {
      throw new BadRequestException('There is no comment with this id')
    }

    const card = await this.cardModel.findOne({
      where: 
      {
        id: comment.cardId
      }
    })

    const column = await this.column1Model.findOne({
      where: 
      {
        id: card.columnId
      }
    })

    // do not check is there a column because columnId of card entity and 
    // cardId of comment entity are not be allowed to be null 

    if (user && user.sub != column.userId) {
      throw new ForbiddenException('You cant do this action')
    }
  }
}
