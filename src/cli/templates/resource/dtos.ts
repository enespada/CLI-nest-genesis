export const createDTO = (capitalized: string) =>
  `export class Create${capitalized}DTO {}`;

export const createPayloadDTO = (capitalized: string) =>
  `export class Create${capitalized}PayloadDTO {}`;

export const updateDTO = (
  capitalized: string,
  lowercased: string
) => `import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Create${capitalized}DTO } from './create-${lowercased}.dto';

export class Update${capitalized}DTO extends PartialType(Create${capitalized}DTO) {
  @ApiProperty({ description: 'Idenfitier of the entity to update'})
  @IsUUID()
  id: string;
}
`;

export const updatePayloadDTO = (
  capitalized: string
) => `import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class Update${capitalized}PayloadDTO {
  @ApiProperty({ description: 'Idenfitier of the entity to update'})
  @IsUUID()
  id: string;
}
`;

export const paginationDTO = (
  capitalized: string,
  lowercased: string
) => `import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import {
  ${capitalized}OrderBy,
  ${capitalized}Relations,
} from '@infrastructure/${lowercased}/entities/${lowercased}.entity';
import { PageOptionsDTO } from '@core/database/dto/pagination-options.dto';
import { ${capitalized} } from '@domain/${lowercased}/models/${lowercased}.model';

export class ${capitalized}PageOptionsDTO extends PageOptionsDTO {
  @ApiProperty({ enum: ${capitalized}OrderBy, default: ${capitalized}OrderBy.id, required: false })
  @IsEnum(${capitalized}OrderBy)
  @IsOptional()
  readonly orderBy?: ${capitalized}OrderBy = ${capitalized}OrderBy.id;

  @ApiProperty({
    required: false,
    isArray: true,
    enum: ${capitalized}Relations,
    default: [],
  })
  @IsEnum(${capitalized}Relations, { each: true })
  @IsOptional()
  @Transform((data) => (Array.isArray(data.value) ? data.value : [data.value]))
  readonly relations?: Array<${capitalized}Relations> = [];

  @ApiProperty({ required: false })
  @IsOptional()
  where?: Partial<${capitalized}>;
}
`;
