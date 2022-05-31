import { Module, BadRequestException, HttpModule } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { RepositoryCollection } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { ALL_ENTITIES } from 'ibap-common/dist/services/entities';
import { RpcControllers, HttpControllers } from './controllers';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { flakeId } from 'ibap-common/dist/common/snippets/flake-idgen';
import { QueryHandlers } from './queries';

const MulterM = MulterModule.registerAsync({
  useFactory: () => ({
    storage: diskStorage({
      destination: global['config'].PUBLIC_FOLDER + '/users',
      filename: (req, file, cb) => {
        const randomName = flakeId();
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      let ext = extname(file.originalname);
      if (ext != '.png' && ext != '.jpg' && ext != '.jpeg' && ext != '.gif') {
        return cb(
          new BadRequestException(
            'Only image files are allowed mediaType image',
          ),
          false,
        );
      }
      cb(null, true);
    },
  }),
});

@Module({
  imports: [CqrsModule, MongooseModule.forFeature([...ALL_ENTITIES]), MulterM,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    })
  ],
  controllers: [...RpcControllers, ...HttpControllers],
  providers: [...CommandHandlers, ...QueryHandlers, RepositoryCollection],
})
export class appUserModule { }
