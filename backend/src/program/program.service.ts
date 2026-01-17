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

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.program.findMany({ 
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.program.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
