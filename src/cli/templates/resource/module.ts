export const module = `import { [entity]Service } from '@application/[filename]/[filename].service';
import { JwtModule } from '@core/middlewares/jwt/jwt.module';
import { LoggerModule } from '@core/services/logger/logger.module';
import { [entity]DomainService } from '@domain/[filename]/[filename].domain';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { [entity] } from './entities/[filename].entity';
import { [entity]Controller } from './[filename].controller';
import { SessionModule } from '@core/services/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([[entity]]),
    SessionModule,
    LoggerModule,
    JwtModule,
  ],
  controllers: [[entity]Controller],
  providers: [[entity]Service, [entity]DomainService],
  exports: [[entity]Service, [entity]DomainService],
})
export class [entity]Module {}
`;
