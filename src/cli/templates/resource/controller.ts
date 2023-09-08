export const controller = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { ${capitalized}Service } from '@application/${lowercased}/${lowercased}.service';
import { ExceptionFilter } from '@core/exceptions/global.exception';
import { TransformInterceptor } from '@core/response/success.response';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtUserGuard } from '@core/middlewares/jwt/user/jwt-user.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Create${capitalized}Dto } from './dto/create-${lowercased}.dto';
import { Update${capitalized}Dto } from './dto/update-${lowercased}.dto';
import { ${capitalized} } from './entities/${lowercased}.entity';
import { ${capitalized}PageOptionsDto } from './dto/${lowercased}-pagination-options.dto';

@Controller('${lowercased}')
@ApiTags('${capitalized}')
@UseFilters(ExceptionFilter)
@UseGuards(JwtUserGuard)
@UseInterceptors(TransformInterceptor)
@ApiUnauthorizedResponse({
  description: 'Bearer token must be a valid Token',
})
export class ${capitalized}Controller {
  constructor(private readonly ${variable}Service: ${capitalized}Service) {}

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the ${lowercased}',
  })
  @ApiOperation({ summary: 'Gets a ${lowercased} by given id' })
  @ApiOkResponse({
    type: ${capitalized},
    description: 'Retrieves ${lowercased} data',
  })
  @ApiResponse({
    description: 'There is no ${lowercased} with the given id',
    status: HttpStatus.NOT_FOUND,
  })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.${variable}Service.findOne({
      where: {
        id,
      }
    });
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets all ${lowercased}' })
  @ApiOkResponse({
    type: Array<${capitalized}>,
    isArray: true,
    description: 'Retrieves an array of ${lowercased}',
  })
  getAll() {
    return this.${variable}Service.find();
  }

  @Get('paginate')
  @ApiOperation({ summary: 'Paginate ${lowercased}' })
  @ApiExtraModels(${capitalized})
  @ApiQuery({
    required: false,
    name: 'where',
    style: 'deepObject',
    explode: true,
    type: 'object',
    schema: {
      $ref: getSchemaPath(${capitalized}),
    },
  })
  @ApiOkResponse({
    type: Array<${capitalized}>,
    isArray: true,
    description: 'Retrieves an array of users',
  })
  paginate(@Query() pageOptionsDto: ${capitalized}PageOptionsDto) {
    return this.${variable}Service.paginate(pageOptionsDto);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Saves an ${lowercased}' })
  @ApiBody({ type: Create${capitalized}Dto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ${capitalized},
    description: 'Retrieves a saved ${lowercased}',
  })
  save(
    @Body()
    ${variable}Dto: Create${capitalized}Dto,
  ) {
    return this.${variable}Service.create(${variable}Dto);
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates a ${lowercased}' })
  @ApiBody({ type: Update${capitalized}Dto })
  @ApiOkResponse({
    type: ${capitalized},
    description: 'Retrieves an updated ${lowercased}',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  update(
    @Body()
    ${variable}Dto: Update${capitalized}Dto,
  ) {
    return this.${variable}Service.update(${variable}Dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletes a ${lowercased}' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the ${lowercased}',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chassis successfully deleted',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.${variable}Service.remove(id);
  }
}
`;
