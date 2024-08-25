import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.cardsService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateCardDto: UpdateCardDto, 
    @CurrentUser() user: JwtPayload
  ) {
    return this.cardsService.update(+id, updateCardDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.cardsService.remove(+id, user);
  }

  @Get(':id/comments')
  findCardComments(@Param('id') id: string) {
    return this.cardsService.findCardCards(+id);
  }
}
