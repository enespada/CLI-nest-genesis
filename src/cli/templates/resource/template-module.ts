export const appModule = (capitalized: string, lowercased: string) =>
  `import { ${capitalized}Service } from '@application/${lowercased}/${lowercased}.service';
import { JwtModule } from '@core/middlewares/jwt/jwt.module';
import { LoggerModule } from '@core/services/logger/logger.module';
import { ${capitalized}Entity } from '@infrastructure/${lowercased}/entities/${lowercased}.entity';
import { ${capitalized}RepositoryImpl } from '@infrastructure/${lowercased}/${lowercased}.repository.impl';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${capitalized}Controller } from './${lowercased}.controller';
import { SessionModule } from '@core/services/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([${capitalized}Entity]),
    SessionModule,
    LoggerModule,
    JwtModule,
  ],
  controllers: [${capitalized}Controller],
  providers: [
    { provide: '${capitalized}Repository', useClass: ${capitalized}RepositoryImpl },
  ],
  exports: [${capitalized}Service, '${capitalized}Repository'],
})
export class ${capitalized}Module {}
`;
