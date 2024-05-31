export const domain = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { Create${capitalized}DTO } from '@controller/${lowercased}/dto/create-${lowercased}.dto';
import { Update${capitalized}DTO } from '@controller/${lowercased}/dto/update-${lowercased}.dto';
import { ${capitalized} } from '@domain/${lowercased}/entities/${lowercased}.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ${capitalized}PageOptionsDTO } from '@controller/${lowercased}/dto/${lowercased}-pagination-options.dto';

@Injectable()
export class ${capitalized}DomainService {
  constructor(
    @InjectRepository(${capitalized})
    private ${variable}Repository: Repository<${capitalized}>,
  ) {}

  async create(create${capitalized}DTO: Create${capitalized}DTO) {
    return await this.${variable}Repository.save(create${capitalized}DTO);
  }

  async update(id: string, update${capitalized}DTO: Update${capitalized}DTO) {
    return await this.${variable}Repository.save({ id, ...update${capitalized}DTO });
  }

  async remove(id: string) {
    return await this.${variable}Repository.delete(id);
  }

  async paginate(${variable}PageOptionsDTO: ${capitalized}PageOptionsDTO) {
    const [totalItems, entities] = await Promise.all([
      this.${variable}Repository.count(),
      this.${variable}Repository.find({
        order: {
          [${variable}PageOptionsDTO.orderBy]: ${variable}PageOptionsDTO.order,
        },
        where: ${variable}PageOptionsDTO.where,
        skip: ${variable}PageOptionsDTO.skip,
        take: ${variable}PageOptionsDTO.take,
        relations: ${variable}PageOptionsDTO.relations as unknown as Array<string>,
      }),
    ]);
    
    return { totalItems, entities };
  }

  async find(options: FindManyOptions<${capitalized}>) {
    return this.${variable}Repository.find(options);
  }

  async findOne(options: FindOneOptions<${capitalized}>) {
    return this.${variable}Repository.findOne(options);
  }
}
`;
