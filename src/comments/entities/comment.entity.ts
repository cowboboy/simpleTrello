import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Card } from "src/cards/entities/card.entity";

@Table
export class Comment extends Model {
    @Column
    @ApiProperty()
    title: string;

    @ForeignKey(() => Card)
    @Column({
        allowNull: false
    })
    @ApiProperty()
    cardId: number;

    @Column({
        allowNull: false
    })
    @ApiProperty()
    userId: number;
}
