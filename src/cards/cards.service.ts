import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { InjectModel } from '@nestjs/sequelize';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';
import { Column1 } from 'src/columns/entities/column.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card) private readonly cardsModel: typeof Card,
    @InjectModel(Column1) private readonly columnsModel: typeof Column1
  ) {}

  async create(createCardDto: CreateCardDto) {
    const newCard = await this.cardsModel.create({
      ...createCardDto
    })
    return newCard;
  }

  async findAll() {
    return await this.cardsModel.findAll();
  }

  async findOne(id: number, user: JwtPayload) {
    await this.checkAuthor(id, user)
    
    return await this.cardsModel.findOne({
      where: {
        id
      }
    });
  }

  async update(
    id: number, 
    updateCardDto: UpdateCardDto, 
    user: JwtPayload
  ) {
    await this.checkAuthor(id, user)

    return await this.cardsModel.update({...updateCardDto}, {
      where: {
        id
      }
    })
  }

  async remove(id: number, user: JwtPayload) {
    await this.checkAuthor(id, user)

    return await this.cardsModel.destroy({
      where: {
        id
      }
    });
  }

  async checkAuthor(id: number, user: JwtPayload) {
    const card = await this.cardsModel.findOne({
      where: {
        id
      }
    })

    if (!card) {
      throw new BadRequestException('There is no card with this id')
    }

    const column = await this.columnsModel.findOne({
      where: {
        id: card.columnId
      }
    })

    // do not check is there a column becose columnId of card entity is not be allowed to be null 

    if (user && user.sub != column.userId) {
      throw new ForbiddenException('You cant do this action')
    }
  }
}
