import { Length } from "class-validator";

export class CreateCommentDto {
    @Length(1, 250)
    title: string;
}
