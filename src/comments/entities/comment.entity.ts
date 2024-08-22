import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Card } from "src/cards/entities/card.entity";

@Table
export class Comment extends Model {
    @Column
    title: string;

    @ForeignKey(() => Card)
    @Column
    cardId: number;
}
