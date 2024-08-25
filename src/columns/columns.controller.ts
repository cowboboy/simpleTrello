import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Column1 } from './entities/column.entity';

@ApiTags('Columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({ summary: "Create column" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Column1 })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get the column with specified id" })
  @ApiParam({name: "id", required: true, description: "column id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Column1 })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.columnsService.findOne(+id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update the column with specified id" })
  @ApiParam({name: "id", required: true, description: "column id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Column1 })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  update(
    @Param('id') id: string, 
    @Body() updateColumnDto: UpdateColumnDto,
    @CurrentUser() user: JwtPayload
  ) {
    return this.columnsService.update(+id, updateColumnDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete the column with specified id" })
  @ApiParam({name: "id", required: true, description: "column id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Boolean})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.columnsService.remove(+id, user);
  }

  @Get(':id/cards')
  @ApiOperation({ summary: "Get column cards with specified id" })
  @ApiParam({name: "id", required: true, description: "column id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Column1 })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findColumnCards(@Param('id') id: string) {
    return this.columnsService.findColumnCards(+id);
  }
}
