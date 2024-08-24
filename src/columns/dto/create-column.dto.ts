import { IsNumberString, Length } from "class-validator";

export class CreateColumnDto {
    @Length(1, 100)
    title: string;

    @IsNumberString()
    userId: number;
}
