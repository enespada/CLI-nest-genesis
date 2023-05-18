export const domain = `import { Create[entity]Dto } from '@controller/[filename]/dto/create-[filename].dto';
import { Update[entity]Dto } from '@controller/[filename]/dto/update-[filename].dto';
import { [entity] } from '@controller/[filename]/entities/[filename].entity';
import { EntityQuery } from '@core/database/dto/entity-query.dto';
import { ErrorDTO } from '@core/response/dto/error.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, forkJoin } from 'rxjs';
import { EntityNotFoundError, Repository } from 'typeorm';
import { [entity]PageOptionsDto } from '@core/database/dto/pagination-options.dto';

@Injectable()
export class [entity]DomainService {
  constructor(
    @InjectRepository([entity])
    private [filename]Repository: Repository<[entity]>,
  ) {}

  create(createChassisDto: Create[entity]Dto) {
    return from(this.[filename]Repository.save(createChassisDto));
  }

  update(id: number, updateChassisDto: Update[entity]Dto) {
    return from(this.[filename]Repository.save({ id, ...updateChassisDto }));
  }

  remove(id: number) {
    return from(this.[filename]Repository.delete({ id }));
  }

  paginate(pageOptionsDto: [entity]PageOptionsDto) {
    return forkJoin([
      this.[alias]Repository.count(),
      this.[alias]Repository.find({
        order: {
          [pageOptionsDto.orderBy]: pageOptionsDto.order,
        },
        where: pageOptionsDto.where,
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        relations: pageOptionsDto.relations as unknown as Array<string>,
      }),
    ]).pipe(
      map(([itemCount, entities]) => {
        return { itemCount, entities };
      }),
    );
  }

  find(options: EntityQuery<[entity]>) {
    return from(
      this.[filename]Repository.find({
        where: options.where,
        take: options.limit,
      }),
    ).pipe(
      map(([filename]s: Array<[entity]>) => {
        if (options.orFail && [filename]s.length === 0)
          throw new EntityNotFoundError(
            [entity],
            \`\${
              [entity].name
            } entities not found. Filtered by: \${Object.keys(
              options.where ?? [],
            ).map((k) => \`\${k.toUpperCase()} (\${k}: \${options.where[k]}), \`)}\`,
          );
        if ([filename]s.length === 0 && options.limit === 1) return null;
        return options.limit === 1 ? [filename]s[0] : [filename]s;
      }),
      catchError((e: HttpException) => {
        if (e instanceof EntityNotFoundError)
          throw new HttpException(
            { name: e.name, message: e.message } as ErrorDTO,
            HttpStatus.NOT_FOUND,
            { cause: e },
          );
        throw e;
      }),
    );
  }
}
`;
