import { Injectable } from '@nestjs/common';
// import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}

  // async create(createProgramDto: CreateProgramDto) {
  //   return this.prisma.program.create({
  //     data: createProgramDto,
  //   });
  // }

  async findAll() {
    return this.prisma.program.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    return this.prisma.program.findUnique({
      where: { id: id.toString() },
    });
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    return this.prisma.program.update({
      where: { id: id.toString() },
      data: updateProgramDto,
    });
  }

  async remove(id: number) {
    return this.prisma.program.delete({
      where: { id: id.toString() },
    });
  }
}
