export const domain = (
  upperCamelCase: string,
  lowerCamelCase: string,
  fileName: string
) => `import { Create${upperCamelCase}PayloadDTO } from '@application/${fileName}/dto/create-${fileName}-payload.dto';
import { Update${upperCamelCase}PayloadDTO } from '@application/${fileName}/dto/update-${fileName}-payload.dto';
import { ${upperCamelCase}PageOptionsDTO } from '@application/${fileName}/dto/${fileName}-pagination-options.dto';
import { ${upperCamelCase} } from './models/${fileName}.model';
import {
  FindManyOptions,
  FindOneOptions,
} from '../shared/interfaces/find-options.interface';

export interface ${upperCamelCase}Repository {
  create(create${upperCamelCase}PayloadDto: Create${upperCamelCase}PayloadDTO): Promise<${upperCamelCase}>;
  paginate(${lowerCamelCase}PageOptionsDto: ${upperCamelCase}PageOptionsDTO): Promise<any>;
  find(options: FindManyOptions<${upperCamelCase}>): Promise<${upperCamelCase}[]>;
  findOne(options: FindOneOptions<${upperCamelCase}>): Promise<${upperCamelCase}>;
  findById(id: string): Promise<${upperCamelCase}>;
  update(update${upperCamelCase}PayloadDto: Update${upperCamelCase}PayloadDTO): Promise<${upperCamelCase}>;
  remove(id: string): Promise<void>;
}
`;
