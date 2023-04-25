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
  [entity]FilterBy,
  [entity]Relations,
} from '@controller/[filename]/entities/[filename].entity';
import { PageOptionsDto } from '@core/database/dto/pagination-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class [entity]PageOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: [entity]FilterBy, default: [entity]FilterBy.id })
  @IsEnum([entity]FilterBy)
  @IsOptional()
  readonly orderBy?: [entity]FilterBy = [entity]FilterBy.id;

  @ApiPropertyOptional({
    isArray: true,
    enum: [entity]Relations,
    default: [],
  })
  @IsEnum([entity]Relations, { each: true })
  @IsOptional()
  @Transform((data) => (Array.isArray(data.value) ? data.value : [data.value]))
  readonly relations?: Array<[entity]Relations> = [];
}

`;
