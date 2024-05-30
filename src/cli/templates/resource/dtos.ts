export const createDto = (capitalized: string) =>
  `export class Create${capitalized}Dto {}`;

export const updateDto = (
  capitalized: string
) => `import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Update${capitalized}Dto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
`;

export const paginationDto = (
  capitalized: string,
  lowercased: string
) => `import {
  ${capitalized},
  ${capitalized}OrderBy,
  ${capitalized}Relations,
} from '@domain/${lowercased}/entities/${lowercased}.entity';
import { PageOptionsDto } from '@core/database/dto/pagination-options.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class ${capitalized}PageOptionsDto extends PageOptionsDto {
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
