export const controller = (
  capitalized: string,
  fileName: string,
  lowerCased: string
) => `import { ${capitalized}Service } from '@application/${fileName}/${fileName}.service';
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
import { Create${capitalized}DTO } from '../../application/${fileName}/dto/create-${fileName}.dto';
import { Update${capitalized}DTO } from '../../application/${fileName}/dto/update-${fileName}.dto';
import { ${capitalized} } from '@domain/${fileName}/models/${fileName}.model';
import { ${capitalized}PageOptionsDTO } from '../../application/${fileName}/dto/${fileName}-pagination-options.dto';

@Controller('${fileName}')
@ApiTags('${capitalized}')
@UseFilters(ExceptionFilter)
@UseGuards(JwtUserGuard)
// @UseInterceptors(TransformInterceptor)
@ApiUnauthorizedResponse({
  description: 'Bearer token must be a valid Token',
})
export class ${capitalized}Controller {
  constructor(private readonly ${lowerCased}Service: ${capitalized}Service) {}

  //-----------------------------------------------POST-----------------------------------------------------------
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Saves a ${capitalized}' })
  @ApiBody({ type: Create${capitalized}DTO })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ${capitalized},
    description: 'Retrieves a saved ${capitalized}',
  })
  save(
    @Body()
    create${capitalized}Dto: Create${capitalized}DTO,
  ) {
    return this.${lowerCased}Service.create(create${capitalized}Dto);
  }

  //-----------------------------------------------GET-----------------------------------------------------------
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets all ${fileName}' })
  @ApiOkResponse({
    type: Array<${capitalized}>,
    isArray: true,
    description: 'Retrieves an array of ${fileName}',
  })
  getAll() {
    return this.${lowerCased}Service.find();
  }
  
  //-----------------------------------------------GET paginate-----------------------------------------------------------
  @Get('paginate')
  @ApiOperation({ summary: 'Paginate ${fileName}' })
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
    description: 'Retrieves an array of ${capitalized}',
  })
  paginate(@Query() ${fileName}PageOptionsDto: ${capitalized}PageOptionsDTO) {
    return this.${lowerCased}Service.paginate(${fileName}PageOptionsDto);
  }

  //-----------------------------------------------GET :id-----------------------------------------------------------
  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the ${fileName}',
  })
  @ApiOperation({ summary: 'Gets a ${fileName} by given id' })
  @ApiOkResponse({
    type: ${capitalized},
    description: 'Retrieves ${fileName} data',
  })
  @ApiResponse({
    description: 'There is no ${fileName} with the given id',
    status: HttpStatus.NOT_FOUND,
  })
  get(@Param('id', ParseUUIDPipe) id: string) {
    return this.${lowerCased}Service.findById(id);
  }

  //-----------------------------------------------PUT-----------------------------------------------------------
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates a ${fileName}' })
  @ApiBody({ type: Update${capitalized}DTO })
  @ApiOkResponse({
    type: ${capitalized},
    description: 'Retrieves an updated ${fileName}',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  update(
    @Body()
    update${capitalized}Dto: Update${capitalized}DTO,
  ) {
    return this.${lowerCased}Service.update(update${capitalized}Dto);
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
    description: '${capitalized} successfully deleted',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.${lowerCased}Service.remove(id);
  }
}
`;
