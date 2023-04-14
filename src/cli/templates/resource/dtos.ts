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
