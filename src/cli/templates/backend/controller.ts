export const controller = `import { [entity]Service } from '@application/[filename]/[filename].service';
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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Create[entity]Dto } from './dto/create-[filename].dto';
import { Update[entity]Dto } from './dto/update-[filename].dto';
import { [entity] } from './entities/[filename].entity';
import { PageOptionsDto } from '@core/database/dto/pagination-options.dto';

@Controller('[filename]')
@ApiTags('[entity]')
@UseFilters(ExceptionFilter)
@UseGuards(JwtUserGuard)
@UseInterceptors(TransformInterceptor)
@ApiUnauthorizedResponse({
  description: 'Bearer token must be a valid Token',
})
export class [entity]Controller {
  constructor(private readonly [filename]Service: [entity]Service) {}

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the [filename]',
  })
  @ApiOperation({ summary: 'Gets a [filename] by given id' })
  @ApiOkResponse({
    type: [entity],
    description: 'Retrieves [filename] data',
  })
  @ApiResponse({
    description: 'There is no [filename] with the given id',
    status: HttpStatus.NOT_FOUND,
  })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.[filename]Service.find({
      where: {
        id,
      },
      limit: 1,
      orFail: true,
    });
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets all [filename]' })
  @ApiOkResponse({
    type: Array<[entity]>,
    isArray: true,
    description: 'Retrieves an array of [filename]',
  })
  getAll() {
    return this.[filename]Service.find();
  }

  @Get('paginate')
  @ApiOperation({ summary: 'Paginate users' })
  @ApiOkResponse({
    type: Array<User>,
    isArray: true,
    description: 'Retrieves an array of users',
  })
  paginate(@Query() pageOptionsDto: PageOptionsDto) {
    return this.usersService.paginate(pageOptionsDto);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Saves an [filename]' })
  @ApiBody({ type: Create[entity]Dto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: [entity],
    description: 'Retrieves a saved [filename]',
  })
  save(
    @Body()
    [filename]Dto: Create[entity]Dto,
  ) {
    return this.[filename]Service.create([filename]Dto);
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates a [filename]' })
  @ApiBody({ type: Update[entity]Dto })
  @ApiOkResponse({
    type: [entity],
    description: 'Retrieves an updated [filename]',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  update(
    @Body()
    [filename]Dto: Update[entity]Dto,
  ) {
    return this.[filename]Service.update([filename]Dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletes a [filename]' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the [filename]',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chassis successfully deleted',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.[filename]Service.remove(id);
  }
}
`;
