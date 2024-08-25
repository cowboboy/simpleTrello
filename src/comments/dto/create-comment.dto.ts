import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateCommentDto {
    @Length(1, 250)
    @ApiProperty()
    title: string;
}
