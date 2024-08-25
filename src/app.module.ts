import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { Comment } from './comments/entities/comment.entity';
import { Card } from './cards/entities/card.entity';
import { Column1 } from './columns/entities/column.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get('DATABASE_URL'),
          models: [
            User, 
            Column1, 
            Card, 
            Comment
          ],
          autoLoadModels: true,
          synchronize: true
        }),
        inject: [ConfigService],
      }
    ),
    UsersModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
