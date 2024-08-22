import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Column1 } from "src/columns/entities/column.entity";

@Table
export class User extends Model{
    @Column(
        {
            allowNull:false, 
            unique: true
        }
    )
    email: string;

    @Column(
        {
            allowNull:false
        }
    )
    password: string;

    @Column
    jwtToken: string;

    @HasMany(() => Column1)
    columns: Column1[];
}
