import { Module, OnModuleInit } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './strategies/http.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'bearer' })],
  exports: [PassportModule],
  providers: [HttpStrategy],
})
export class AuthenticationModule implements OnModuleInit {
  onModuleInit() {}
}
