import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Card } from './entities/card.entity';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: "Create card" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Card})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get the card with specified id" })
  @ApiParam({name: "id", required: true, description: "card id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Card})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.cardsService.findOne(+id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update the card with specified id" })
  @ApiParam({name: "id", required: true, description: "card id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Card})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  update(
    @Param('id') id: string, 
    @Body() updateCardDto: UpdateCardDto, 
    @CurrentUser() user: JwtPayload
  ) {
    return this.cardsService.update(+id, updateCardDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete the card with specified id" })
  @ApiParam({name: "id", required: true, description: "card id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Card})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.cardsService.remove(+id, user);
  }

  @Get(':id/comments')
  @ApiOperation({ summary: "Get card comments with specified id" })
  @ApiParam({name: "id", required: true, description: "card id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Card})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  findCardComments(@Param('id') id: string) {
    return this.cardsService.findCardCards(+id);
  }
}
