import { ApiProperty } from "@nestjs/swagger";
import { Column, ForeignKey, Table, Model, HasMany} from "sequelize-typescript";
import { Card } from "src/cards/entities/card.entity";
import { User } from "src/users/entities/user.entity";

@Table
export class Column1 extends Model{
    @Column
    @ApiProperty()
    title: string;

    @ForeignKey(() => User)
    @Column({
        allowNull: false
    })
    @ApiProperty()
    userId: number;

    @HasMany(() => Card)
    @ApiProperty()
    cards: Card[];
}
