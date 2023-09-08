export const constants = (
  capitalized: string,
  lowercased: string
) => `import { ${capitalized} } from '../entities/${lowercased}.entity';

export const default${capitalized}Values: Array<Partial<${capitalized}>> = [];
`;
