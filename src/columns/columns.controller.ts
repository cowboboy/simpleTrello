import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.columnsService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateColumnDto: UpdateColumnDto,
    @CurrentUser() user: JwtPayload
  ) {
    return this.columnsService.update(+id, updateColumnDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.columnsService.remove(+id, user);
  }

  @Get(':id/cards')
  findColumnCards(@Param('id') id: string) {
    return this.columnsService.findColumnCards(+id);
  }
}
