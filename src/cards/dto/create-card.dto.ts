import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, Length } from "class-validator";

export class CreateCardDto {
    @Length(1, 500)
    @ApiProperty()
    title: string;

    @IsNumberString()
    @ApiProperty()
    columnId: number;

    @IsNumberString()
    @ApiProperty()
    userId: number;
}
