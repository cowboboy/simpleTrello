import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Column1 } from "src/columns/entities/column.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Table
export class Card extends Model {
    @Column
    title: string;

    @ForeignKey(() => Column1)
    columnId: number;

    @HasMany(() => Comment)
    comments: Comment[];
}