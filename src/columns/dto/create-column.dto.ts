import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, Length } from "class-validator";

export class CreateColumnDto {
    @Length(1, 100)
    @ApiProperty()
    title: string;

    @IsNumberString()
    @ApiProperty()
    userId: number;
}
