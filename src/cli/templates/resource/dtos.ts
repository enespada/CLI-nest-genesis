export const createDto = `export class Create[entity]Dto {}`;

export const updateDto = `import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Update[entity]Dto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
`;

export const paginationDto = `import {
  [entity],
  [entity]OrderBy,
  [entity]Relations,
} from '@controller/[filename]/entities/[filename].entity';
import { PageOptionsDto } from '@core/database/dto/pagination-options.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class [entity]PageOptionsDto extends PageOptionsDto {
  @ApiProperty({ enum: [entity]OrderBy, default: [entity]OrderBy.id, required: false })
  @IsEnum([entity]OrderBy)
  @IsOptional()
  readonly orderBy?: [entity]OrderBy = [entity]OrderBy.id;

  @ApiProperty({
    required: false,
    isArray: true,
    enum: [entity]Relations,
    default: [],
  })
  @IsEnum([entity]Relations, { each: true })
  @IsOptional()
  @Transform((data) => (Array.isArray(data.value) ? data.value : [data.value]))
  readonly relations?: Array<[entity]Relations> = [];

  @ApiProperty({ required: false })
  @IsOptional()
  where?: Partial<[entity]>;
}

`;
