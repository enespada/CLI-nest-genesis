export const entity = (
  capitalized: string,
  lowercased: string
) => `import { AbstractEntity } from '@core/database/entity/abstract.entity';
import { Create${capitalized}DTO } from '@controller/${lowercased}/dto/create-${lowercased}.dto';
import { Entity } from 'typeorm';

@Entity()
export class ${capitalized} extends AbstractEntity {
}

export const default${capitalized}Values: Array<Create${capitalized}DTO> = [];

export enum ${capitalized}Where {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export enum ${capitalized}OrderBy {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export enum ${capitalized}Relations {}
`;
