import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column1 } from './entities/column.entity';
import { InjectModel } from '@nestjs/sequelize';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';

@Injectable()
export class ColumnsService {
  constructor(@InjectModel(Column1) private readonly column1Model: typeof Column1) {}

  async create(createColumnDto: CreateColumnDto) {
    const newColumn = await this.column1Model.create({
      ...createColumnDto
    })
    return newColumn;
  }

  async findAll() {
    return await this.column1Model.findAll();
  }

  async findOne(id: number, user: JwtPayload) {
    await this.checkAuthor(id, user)
    
    return await this.column1Model.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, updateColumnDto: UpdateColumnDto, user: JwtPayload) {
    await this.checkAuthor(id, user)

    return await this.column1Model.update({...updateColumnDto}, {
      where: {
        id
      }
    })
  }

  async remove(id: number, user: JwtPayload) {
    await this.checkAuthor(id, user)

    return await this.column1Model.destroy({
      where: {
        id
      }
    });
  }

  async checkAuthor(id: number, user: JwtPayload) {
    const column = await this.column1Model.findOne({
      where: 
      {
        id
      }
    })

    if (!column) {
      throw new BadRequestException('There is no column with this id')
    }

    if (user && user.sub != column.userId) {
      throw new ForbiddenException('You cant do this action')
    }
  }
}
