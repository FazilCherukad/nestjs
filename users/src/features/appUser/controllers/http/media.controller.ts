import {
  Controller,
  UseInterceptors,
  Post,
  Param,
  UploadedFile,
  HttpException,
  Body,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddImageDto } from '../../dto/add-image-dto';
import { UpdateAppUserImageCommand } from '../../commands/appUser/update-image.command';
// import { UpdateUserImageCommand } from '../../commands/user/update-image.command';
// import { AddImageDto } from '../../dto/add-image-dto';

@Controller('command/appUser')
export class MediaCommandController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('image/add')
  async updateImage(@Body() dto: AddImageDto, @UploadedFile() file) {
    let resp = await this.commandBus
      .execute(new UpdateAppUserImageCommand(dto, file))
      .catch(e => {
        switch (e.message) {
          default:
            throw new HttpException(
              { status: 'error', message: e.message },
              500,
            );
        }
      });
    return {
      data: resp,
      message: ' Image added',
    };
  }
}
