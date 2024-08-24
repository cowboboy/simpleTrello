import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Column1 } from './entities/column.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService, JwtService, ConfigService
  ],
  imports: [
    SequelizeModule.forFeature([Column1])
  ]
})
export class ColumnsModule {}
