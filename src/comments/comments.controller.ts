import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtPayload } from 'src/auth/interfaces/auth.interface';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Comment } from './entities/comment.entity';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: "Create comment" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Comment})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get the comment with specified id" })
  @ApiParam({name: "id", required: true, description: "comment id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Comment})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.commentsService.findOne(+id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update the comment with specified id" })
  @ApiParam({name: "id", required: true, description: "comment id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Comment})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  update(
    @Param('id') id: string, 
    @Body() updateCommentDto: UpdateCommentDto, 
    @CurrentUser() user: JwtPayload
  ) {
    return this.commentsService.update(+id, updateCommentDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete the comment with specified id" })
  @ApiParam({name: "id", required: true, description: "comment id"})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Comment})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.commentsService.remove(+id, user);
  }
}
