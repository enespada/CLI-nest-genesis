export const domain = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { Create${capitalized}Dto } from '@controller/${lowercased}/dto/create-${lowercased}.dto';
import { Update${capitalized}Dto } from '@controller/${lowercased}/dto/update-${lowercased}.dto';
import { ${capitalized} } from '@controller/${lowercased}/entities/${lowercased}.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, forkJoin } from 'rxjs';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ${capitalized}PageOptionsDto } from '@controller/${lowercased}/dto/${lowercased}-pagination-options.dto';

@Injectable()
export class ${capitalized}DomainService {
  constructor(
    @InjectRepository(${capitalized})
    private ${variable}Repository: Repository<${capitalized}>,
  ) {}

  create(createChassisDto: Create${capitalized}Dto) {
    return from(this.${variable}Repository.save(createChassisDto));
  }

  update(id: number, updateChassisDto: Update${capitalized}Dto) {
    return from(this.${variable}Repository.save({ id, ...updateChassisDto }));
  }

  remove(id: number) {
    return from(this.${variable}Repository.delete({ id }));
  }

  paginate(pageOptionsDto: ${capitalized}PageOptionsDto) {
    return forkJoin([
      this.${variable}Repository.count(),
      this.${variable}Repository.find({
        order: {
          [pageOptionsDto.orderBy]: pageOptionsDto.order,
        },
        where: pageOptionsDto.where,
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        relations: pageOptionsDto.relations as unknown as Array<string>,
      }),
    ]).pipe(
      map(([totalItems, entities]) => {
        return { totalItems, entities };
      }),
    );
  }

  find(options: FindManyOptions<${capitalized}>) {
    return from(this.${variable}Repository.find(options));
  }

  findOne(options: FindOneOptions<${capitalized}>) {
    return from(this.${variable}Repository.findOne(options));
  }
}
`;
