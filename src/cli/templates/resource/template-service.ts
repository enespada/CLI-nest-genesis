export const application = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { Create${capitalized}DTO } from '@application/${lowercased}/dto/create-${lowercased}.dto';
import { Update${capitalized}DTO } from '@application/${lowercased}/dto/update-${lowercased}.dto';
import { ${capitalized} } from '@domain/${lowercased}/models/${lowercased}.model';
import { ${capitalized}Repository } from '@domain/${lowercased}/${lowercased}.repository';
import { Injectable } from '@nestjs/common';
import { PageDTO } from '@core/database/dto/page.dto';
import { PageMetaDTO } from '@core/database/dto/pagination-meta.dto';
import { ${capitalized}PageOptionsDTO } from '@application/${lowercased}/dto/${lowercased}-pagination-options.dto';
import { FindManyOptions, FindOneOptions } from '@domain/shared/interfaces/find-options.interface';

@Injectable()
export class ${capitalized}Service {
  constructor(
    @Inject('${capitalized}Repository')
    private ${variable}Repository: ${capitalized}Repository
  ) {}

  async create(create${capitalized}Dto: Create${capitalized}DTO): Promise<${capitalized}> {
    return await this.${variable}Repository.create(create${capitalized}Dto);
  }

  async find(options?: FindManyOptions<${capitalized}>): Promise<${capitalized}[]> {
    return await this.${variable}Repository.find(options ?? {});
  }

  async findOne(options?: FindOneOptions<${capitalized}>): Promise<${capitalized}> {
    return await this.${variable}Repository.findOne(options ?? {});
  }

  async findById(id: string): Promise<${capitalized}> {
    return await this.${variable}Repository.findById(id);
  }

  async paginate(${variable}PageOptionsDto: ${capitalized}PageOptionsDTO): Promise<any> {
    const { totalItems, entities } =
      await this.${variable}Repository.paginate(${variable}PageOptionsDto);
    const pageMetaDto = new PageMetaDTO({
      totalItems,
      pageOptionsDto: ${variable}PageOptionsDto 
    });
    return new PageDTO(entities, pageMetaDto);
  }

  async update(update${capitalized}Dto: Update${capitalized}DTO): Promise<${capitalized}> {
    // We search the user to check if it exists
    await this.${variable}Repository.findById(${variable}Id);
    const update${capitalized}PayloadDto: Partial<Update${capitalized}PayloadDTO> = {
      ...update${capitalized}Dto,
    };
    return await this.${variable}Repository.update(update${capitalized}PayloadDto);
  }

  async remove(id: string): Promise<void> {
    return await this.${variable}Repository.remove(id);
  }
}
`;
