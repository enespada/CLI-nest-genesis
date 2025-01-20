export const application = (
  upperCamelCase: string,
  lowerCamelCase: string,
  fileName: string
) => `import { Create${upperCamelCase}DTO } from '@application/${fileName}/dto/create-${fileName}.dto';
import { Update${upperCamelCase}DTO } from '@application/${fileName}/dto/update-${fileName}.dto';
import { ${upperCamelCase} } from '@domain/${fileName}/models/${fileName}.model';
import { ${upperCamelCase}Repository } from '@domain/${fileName}/${fileName}.repository';
import { Inject, Injectable } from '@nestjs/common';
import { PageDTO } from '@core/database/dto/page.dto';
import { PageMetaDTO } from '@core/database/dto/pagination-meta.dto';
import { ${upperCamelCase}PageOptionsDTO } from '@application/${fileName}/dto/${fileName}-pagination-options.dto';
import { FindManyOptions, FindOneOptions } from '@domain/shared/interfaces/find-options.interface';
import { Update${upperCamelCase}PayloadDTO } from './dto/update-${fileName}-payload.dto';
import { Create${upperCamelCase}PayloadDTO } from './dto/create-${fileName}-payload.dto';


@Injectable()
export class ${upperCamelCase}Service {
  constructor(
    @Inject('${upperCamelCase}Repository')
    private ${lowerCamelCase}Repository: ${upperCamelCase}Repository
  ) {}

  async create(create${upperCamelCase}Dto: Create${upperCamelCase}DTO): Promise<${upperCamelCase}> {
    const create${upperCamelCase}PayloadDto: Create${upperCamelCase}PayloadDTO = { ...create${upperCamelCase}Dto };
    return await this.${lowerCamelCase}Repository.create(create${upperCamelCase}PayloadDto);
  }

  async find(options?: FindManyOptions<${upperCamelCase}>): Promise<${upperCamelCase}[]> {
    return await this.${lowerCamelCase}Repository.find(options ?? {});
  }

  async findOne(options?: FindOneOptions<${upperCamelCase}>): Promise<${upperCamelCase}> {
    return await this.${lowerCamelCase}Repository.findOne(options ?? {});
  }

  async findById(id: string): Promise<${upperCamelCase}> {
    return await this.${lowerCamelCase}Repository.findById(id);
  }

  async paginate(${lowerCamelCase}PageOptionsDto: ${upperCamelCase}PageOptionsDTO): Promise<any> {
    const { totalItems, entities } =
      await this.${lowerCamelCase}Repository.paginate(${lowerCamelCase}PageOptionsDto);
    const pageMetaDto = new PageMetaDTO({
      totalItems,
      pageOptionsDto: ${lowerCamelCase}PageOptionsDto 
    });
    return new PageDTO(entities, pageMetaDto);
  }

  async update(update${upperCamelCase}Dto: Update${upperCamelCase}DTO): Promise<${upperCamelCase}> {
    // We search the user to check if it exists
    await this.${lowerCamelCase}Repository.findById(update${upperCamelCase}Dto.id);
    const update${upperCamelCase}PayloadDto: Partial<Update${upperCamelCase}PayloadDTO> = {
      ...update${upperCamelCase}Dto,
    };
    return await this.${lowerCamelCase}Repository.update(update${upperCamelCase}PayloadDto as Update${upperCamelCase}PayloadDTO);
  }

  async remove(id: string): Promise<void> {
    return await this.${lowerCamelCase}Repository.remove(id);
  }
}
`;
