export const domain = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { Create${capitalized}PayloadDTO } from '@application/${lowercased}/dto/create-${lowercased}-payload.dto';
import { Update${capitalized}PayloadDTO } from '@application/${lowercased}/dto/update-${lowercased}-payload.dto';
import { ${capitalized}PageOptionsDTO } from '@application/${lowercased}/dto/${lowercased}-pagination-options.dto';
import { ${capitalized} } from './models/${lowercased}.model';
import {
  FindManyOptions,
  FindOneOptions,
} from '../shared/interfaces/find-options.interface';

export interface ${capitalized}Repository {
  async create(create${capitalized}PayloadDto: Create${capitalized}PayloadDTO): Promise<${capitalized}>;
  async paginate(${variable}PageOptionsDto: ${capitalized}PageOptionsDTO): Promise<any>;
  async find(options: FindManyOptions<${capitalized}>): Promise<${capitalized}[]>;
  async findOne(options: FindOneOptions<${capitalized}>): Promise<${capitalized}>;
  async findById(id: string): Promise<${capitalized}>;
  async update(update${capitalized}PayloadDto: Update${capitalized}PayloadDTO): Promise<${capitalized}>;
  async remove(id: string): Promise<void>;
}
`;
