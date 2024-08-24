import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Column1 } from 'src/columns/entities/column.entity';
import { Card } from './entities/card.entity';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    SequelizeModule.forFeature([Card, Column1, Comment])
  ]
})
export class CardsModule {}
