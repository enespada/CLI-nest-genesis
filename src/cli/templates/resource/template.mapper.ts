export const mapper = (
  upperCamelCase: string,
  lowerCamelCase: string,
  fileName: string
) => `import { ${upperCamelCase} } from '@domain/${lowerCamelCase}/models/${lowerCamelCase}.model';
import { ${upperCamelCase}Entity } from '../entities/${lowerCamelCase}.entity';

export class ${upperCamelCase}Mapper {
  static entityToModel(${lowerCamelCase}Entity: ${upperCamelCase}Entity): ${upperCamelCase} {
    return {
      id: ${lowerCamelCase}Entity.id,
    } as ${upperCamelCase};
  }

  static modelToEntity(${lowerCamelCase}: ${upperCamelCase}): ${upperCamelCase}Entity {
    return {
      id: ${lowerCamelCase}.id,
    } as ${upperCamelCase}Entity;
  }
}
`;
