import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Column1 } from "src/columns/entities/column.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Table
export class Card extends Model {
    @Column
    @ApiProperty()
    title: string;

    @ForeignKey(() => Column1)
    @Column({
        allowNull: false
    })
    @ApiProperty()
    columnId: number;

    @Column({
        allowNull: false
    })
    @ApiProperty()
    userId: number;

    @HasMany(() => Comment)
    @ApiProperty()
    comments: Comment[];
}