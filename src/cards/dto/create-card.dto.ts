import { IsNumberString, Length } from "class-validator";

export class CreateCardDto {
    @Length(1, 500)
    title: string;

    @IsNumberString()
    columnId: number;

    @IsNumberString()
    userId: number;
}
