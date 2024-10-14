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
  async create(create${upperCamelCase}PayloadDto: Create${upperCamelCase}PayloadDTO): Promise<${upperCamelCase}>;
  async paginate(${lowerCamelCase}PageOptionsDto: ${upperCamelCase}PageOptionsDTO): Promise<any>;
  async find(options: FindManyOptions<${upperCamelCase}>): Promise<${upperCamelCase}[]>;
  async findOne(options: FindOneOptions<${upperCamelCase}>): Promise<${upperCamelCase}>;
  async findById(id: string): Promise<${upperCamelCase}>;
  async update(update${upperCamelCase}PayloadDto: Update${upperCamelCase}PayloadDTO): Promise<${upperCamelCase}>;
  async remove(id: string): Promise<void>;
}
`;
