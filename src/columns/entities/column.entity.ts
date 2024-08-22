import { Column, ForeignKey, Table, Model, HasMany} from "sequelize-typescript";
import { Card } from "src/cards/entities/card.entity";
import { User } from "src/users/entities/user.entity";

@Table
export class Column1 extends Model{
    @Column
    title: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @HasMany(() => Card)
    cards: Card[];
}
