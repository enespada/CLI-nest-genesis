export const controller = (
  upperCamelCase: string,
  lowerCamelCase: string,
  fileName: string
) => `import { ${upperCamelCase}Service } from '@application/${fileName}/${fileName}.service';
import { ExceptionFilter } from '@core/exceptions/global.exception';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Post,
  Put,
  UseFilters,
  UseGuards,
  ParseUUIDPipe
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
import { Create${upperCamelCase}DTO } from '../../application/${fileName}/dto/create-${fileName}.dto';
import { Update${upperCamelCase}DTO } from '../../application/${fileName}/dto/update-${fileName}.dto';
import { ${upperCamelCase} } from '@domain/${fileName}/models/${fileName}.model';
import { ${upperCamelCase}PageOptionsDTO } from '../../application/${fileName}/dto/${fileName}-pagination-options.dto';

@Controller('${fileName}')
@ApiTags('${upperCamelCase}')
@UseFilters(ExceptionFilter)
@UseGuards(JwtUserGuard)
// @UseInterceptors(TransformInterceptor)
@ApiUnauthorizedResponse({
  description: 'Bearer token must be a valid Token',
})
export class ${upperCamelCase}Controller {
  constructor(private readonly ${lowerCamelCase}Service: ${upperCamelCase}Service) {}

  //-----------------------------------------------POST-----------------------------------------------------------
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Saves a ${upperCamelCase}' })
  @ApiBody({ type: Create${upperCamelCase}DTO })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ${upperCamelCase},
    description: 'Retrieves a saved ${upperCamelCase}',
  })
  save(
    @Body()
    create${upperCamelCase}Dto: Create${upperCamelCase}DTO,
  ) {
    return this.${lowerCamelCase}Service.create(create${upperCamelCase}Dto);
  }

  //-----------------------------------------------GET-----------------------------------------------------------
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets all ${fileName}' })
  @ApiOkResponse({
    type: Array<${upperCamelCase}>,
    isArray: true,
    description: 'Retrieves an array of ${upperCamelCase}',
  })
  getAll() {
    return this.${lowerCamelCase}Service.find();
  }
  
  //-----------------------------------------------GET paginate-----------------------------------------------------------
  @Get('paginate')
  @ApiOperation({ summary: 'Paginate list of ${upperCamelCase}' })
  @ApiExtraModels(${upperCamelCase})
  @ApiQuery({
    required: false,
    name: 'where',
    style: 'deepObject',
    explode: true,
    type: 'object',
    schema: {
      $ref: getSchemaPath(${upperCamelCase}),
    },
  })
  @ApiOkResponse({
    type: Array<${upperCamelCase}>,
    isArray: true,
    description: 'Retrieves an array of ${upperCamelCase}',
  })
  paginate(@Query() ${lowerCamelCase}PageOptionsDto: ${upperCamelCase}PageOptionsDTO) {
    return this.${lowerCamelCase}Service.paginate(${lowerCamelCase}PageOptionsDto);
  }

  //-----------------------------------------------GET :id-----------------------------------------------------------
  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the ${upperCamelCase}',
  })
  @ApiOperation({ summary: 'Gets a ${upperCamelCase} by given id' })
  @ApiOkResponse({
    type: ${upperCamelCase},
    description: 'Retrieves ${upperCamelCase} data',
  })
  @ApiResponse({
    description: 'There is no ${upperCamelCase} with the given id',
    status: HttpStatus.NOT_FOUND,
  })
  get(@Param('id', ParseUUIDPipe) id: string) {
    return this.${lowerCamelCase}Service.findById(id);
  }

  //-----------------------------------------------PUT-----------------------------------------------------------
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates a ${upperCamelCase}' })
  @ApiBody({ type: Update${upperCamelCase}DTO })
  @ApiOkResponse({
    type: ${upperCamelCase},
    description: 'Retrieves an updated ${upperCamelCase}',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  update(
    @Body()
    update${upperCamelCase}Dto: Update${upperCamelCase}DTO,
  ) {
    return this.${lowerCamelCase}Service.update(update${upperCamelCase}Dto);
  }

  //-----------------------------------------------DELETE :id-----------------------------------------------------------
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletes a ${fileName}' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the ${fileName}',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '${upperCamelCase} successfully deleted',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.${lowerCamelCase}Service.remove(id);
  }
}
`;
