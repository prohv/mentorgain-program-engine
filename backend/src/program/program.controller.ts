import { Controller, Get, Post, Body, Patch, Param, Delete, Query,  ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ProgramService } from './program.service';
// import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  // @Post()
  // create(@Body() createProgramDto: CreateProgramDto) {
  //   return this.programService.create(createProgramDto);
  // }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.programService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programService.update(+id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programService.remove(+id);
  }
}
