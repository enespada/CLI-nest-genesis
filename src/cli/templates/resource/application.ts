export const application = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { Create${capitalized}DTO } from '@controller/${lowercased}/dto/create-${lowercased}.dto';
import { Update${capitalized}DTO } from '@controller/${lowercased}/dto/update-${lowercased}.dto';
import { ${capitalized} } from '@domain/${lowercased}/entities/${lowercased}.entity';
import { ${capitalized}DomainService } from '@domain/${lowercased}/${lowercased}.domain';
import { Injectable } from '@nestjs/common';
import { PageDTO } from '@core/database/dto/page.dto';
import { PageMetaDTO } from '@core/database/dto/pagination-meta.dto';
import { ${capitalized}PageOptionsDTO } from '@controller/${lowercased}/dto/${lowercased}-pagination-options.dto';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class ${capitalized}Service {
  constructor(private ${variable}DomainService: ${capitalized}DomainService) {}

  async create(create${capitalized}DTO: Create${capitalized}DTO) {
    return await this.${variable}DomainService.create(create${capitalized}DTO);
  }

  async update(update${capitalized}DTO: Update${capitalized}DTO) {
    return await this.${variable}DomainService.update( update${capitalized}DTO);
  }

  async remove(id: string) {
    return await this.${variable}DomainService.remove(id);
  }

  async find(options?: FindManyOptions<${capitalized}>) {
    return await this.${variable}DomainService.find(options ?? {});
  }

  async findOne(options?: FindOneOptions<${capitalized}>) {
    return await this.${variable}DomainService.findOne(options ?? {});
  }

  async paginate(pageOptionsDTO: ${capitalized}PageOptionsDTO) {
    const { totalItems, entities } =
      await this.${variable}DomainService.paginate(pageOptionsDTO);
    const pageMetaDTO = new PageMetaDTO({ totalItems, pageOptionsDTO });
    return new PageDTO(entities, pageMetaDTO);
  }
}
`;
