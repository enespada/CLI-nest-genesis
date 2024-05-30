export const domain = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { Create${capitalized}Dto } from '@controller/${lowercased}/dto/create-${lowercased}.dto';
import { Update${capitalized}Dto } from '@controller/${lowercased}/dto/update-${lowercased}.dto';
import { ${capitalized} } from '@domain/${lowercased}/entities/${lowercased}.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ${capitalized}PageOptionsDto } from '@controller/${lowercased}/dto/${lowercased}-pagination-options.dto';

@Injectable()
export class ${capitalized}DomainService {
  constructor(
    @InjectRepository(${capitalized})
    private ${variable}Repository: Repository<${capitalized}>,
  ) {}

  async create(create${capitalized}Dto: Create${capitalized}Dto) {
    return await this.${variable}Repository.save(create${capitalized}Dto);
  }

  async update(id: number, update${capitalized}Dto: Update${capitalized}Dto) {
    return await this.${variable}Repository.save({ id, ...update${capitalized}Dto });
  }

  async remove(id: number) {
    return await this.${variable}Repository.delete({ id });
  }

  async paginate(${variable}PageOptionsDto: ${capitalized}PageOptionsDto) {
     let [totalItems, entities] = await Promise.all([
      this.${variable}Repository.count(),
      this.${variable}Repository.find({
        order: {
          [${variable}PageOptionsDto.orderBy]: ${variable}PageOptionsDto.order,
        },
        where: ${variable}PageOptionsDto.where,
        skip: ${variable}PageOptionsDto.skip,
        take: ${variable}PageOptionsDto.take,
        relations: ${variable}PageOptionsDto.relations as unknown as Array<string>,
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
