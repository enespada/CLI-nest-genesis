export const entity = (
  capitalized: string
) => `import { Entity } from 'typeorm';
import {
  AbstractEntity,
  AbstractOrderBy,
  AbstractWhere,
} from '@core/database/entity/abstract.entity';

@Entity()
export class ${capitalized}Entity extends AbstractEntity {}

export const default${capitalized}Values: Array<${capitalized}Entity> = [];


//--------------------------------------------Where-------------------------------------------------------------
enum ${capitalized}WhereEnum {}
export type ${capitalized}Where = ${capitalized}WhereEnum | AbstractWhere;
export const ${capitalized}Where = { ...${capitalized}WhereEnum, ...AbstractWhere };

//--------------------------------------------OrderBy-------------------------------------------------------------
enum ${capitalized}OrderByEnum {}
export type ${capitalized}OrderBy = ${capitalized}OrderByEnum | AbstractOrderBy;
export const ${capitalized}OrderBy = { ...${capitalized}OrderByEnum, ...AbstractOrderBy };

export enum ${capitalized}Relations {}
`;
