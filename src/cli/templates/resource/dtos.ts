export const createDTO = (upperCamelCase: string) =>
  `export class Create${upperCamelCase}DTO {}`;

export const createPayloadDTO = (upperCamelCase: string) =>
  `export class Create${upperCamelCase}PayloadDTO {}`;

export const updateDTO = (
  upperCamelCase: string,
  fileName: string
) => `import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Create${upperCamelCase}DTO } from './create-${fileName}.dto';

export class Update${upperCamelCase}DTO extends PartialType(Create${upperCamelCase}DTO) {
  @ApiProperty({ description: 'Idenfitier of the entity to update'})
  @IsUUID()
  id: string;
}
`;

export const updatePayloadDTO = (
  upperCamelCase: string
) => `import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class Update${upperCamelCase}PayloadDTO {
  @ApiProperty({ description: 'Idenfitier of the entity to update'})
  @IsUUID()
  id: string;
}
`;

export const paginationDTO = (
  upperCamelCase: string,
  fileName: string
) => `import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import {
  ${upperCamelCase}OrderBy,
  ${upperCamelCase}Relations,
} from '@infrastructure/${fileName}/entities/${fileName}.entity';
import { PageOptionsDTO } from '@core/database/dto/pagination-options.dto';
import { ${upperCamelCase} } from '@domain/${fileName}/models/${fileName}.model';

export class ${upperCamelCase}PageOptionsDTO extends PageOptionsDTO {
  @ApiProperty({ enum: ${upperCamelCase}OrderBy, default: ${upperCamelCase}OrderBy.id, required: false })
  @IsEnum(${upperCamelCase}OrderBy)
  @IsOptional()
  readonly orderBy?: ${upperCamelCase}OrderBy = ${upperCamelCase}OrderBy.id;

  @ApiProperty({
    required: false,
    isArray: true,
    enum: ${upperCamelCase}Relations,
    default: [],
  })
  @IsEnum(${upperCamelCase}Relations, { each: true })
  @IsOptional()
  @Transform((data) => (Array.isArray(data.value) ? data.value : [data.value]))
  readonly relations?: Array<${upperCamelCase}Relations> = [];

  @ApiProperty({ required: false })
  @IsOptional()
  where?: Partial<${upperCamelCase}>;
}
`;
