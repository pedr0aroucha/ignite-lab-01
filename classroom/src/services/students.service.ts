import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  async listAllStudents() {
    return await this.prismaService.student.findMany();
  }

  async getStudentById(id: string) {
    return await this.prismaService.student.findUnique({
      where: {
        id,
      },
    });
  }
}
