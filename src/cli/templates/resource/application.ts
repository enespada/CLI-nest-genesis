export const application = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { Create${capitalized}Dto } from '@controller/${lowercased}/dto/create-${lowercased}.dto';
import { Update${capitalized}Dto } from '@controller/${lowercased}/dto/update-${lowercased}.dto';
import { ${capitalized}} from '@domain/${lowercased}/entities/${lowercased}.entity';
import { ${capitalized}DomainService } from '@domain/${lowercased}/${lowercased}.domain';
import { Injectable } from '@nestjs/common';
import { PageDto } from '@core/database/dto/page.dto';
import { PageMetaDto } from '@core/database/dto/pagination-meta.dto';
import { ${capitalized}PageOptionsDto } from '@controller/${lowercased}/dto/${lowercased}-pagination-options.dto';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class ${capitalized}Service {
  constructor(private ${variable}DomainService: ${capitalized}DomainService) {}

  create(create${capitalized}Dto: Create${capitalized}Dto) {
    return this.${variable}DomainService.create(createChassisDto);
  }

  update(update${capitalized}Dto: Update${capitalized}Dto) {
    return this.${variable}DomainService.update(
      update${capitalized}Dto.id,
      update${capitalized}Dto,
    );
  }

  remove(id: number) {
    return this.${variable}DomainService.remove(id);
  }

  async find(options?: FindManyOptions<${capitalized}>) {
    return await this.${variable}DomainService.find(options ?? {});
  }

  async findOne(options?: FindOneOptions<${capitalized}>) {
    return await this.${variable}DomainService.findOne(options ?? {});
  }

  async paginate(pageOptionsDto: UserPageOptionsDto) {
    let { totalItems, entities } =
      await this.usersDomainService.paginate(pageOptionsDto);
    const pageMetaDto = new PageMetaDto({ totalItems, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
`;
