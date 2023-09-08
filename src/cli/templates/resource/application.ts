export const application = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { Create${capitalized}Dto } from '@controller/${lowercased}/dto/create-${lowercased}.dto';
import { Update${capitalized}Dto } from '@controller/${lowercased}/dto/update-${lowercased}.dto';
import { ${capitalized} } from '@controller/${lowercased}/entities/${lowercased}.entity';
import { ${capitalized}DomainService } from '@domain/${lowercased}/${lowercased}.domain';
import { Injectable } from '@nestjs/common';
import { from, map } from 'rxjs';
import { PageDto } from '@core/database/dto/page.dto';
import { PageMetaDto } from '@core/database/dto/pagination-meta.dto';
import { ${capitalized}PageOptionsDto } from '@controller/${lowercased}/dto/${lowercased}-pagination-options.dto';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class ${capitalized}Service {
  constructor(private ${variable}DomainService: ${capitalized}DomainService) {}

  create(createChassisDto: Create${capitalized}Dto) {
    return this.${variable}DomainService.create(createChassisDto);
  }

  update(updateChassisDto: Update${capitalized}Dto) {
    return this.${variable}DomainService.update(
      updateChassisDto.id,
      updateChassisDto,
    );
  }

  remove(id: number) {
    return this.${variable}DomainService.remove(id);
  }

  find(options?: FindManyOptions<${capitalized}>) {
    return this.${variable}DomainService.find(options ?? {});
  }

  findOne(options?: FindOneOptions<${capitalized}>) {
    return from(this.${variable}DomainService.findOne(options ?? {}));
  }

  paginate(pageOptionsDto: ${capitalized}PageOptionsDto) {
    return this.${variable}DomainService.paginate(pageOptionsDto).pipe(
      map(({ totalItems, entities }) => {
        const pageMetaDto = new PageMetaDto({ totalItems, pageOptionsDto });
        return new PageDto(entities, pageMetaDto);
      }),
    );
  }
}
`;
