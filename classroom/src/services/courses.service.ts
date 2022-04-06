import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prismaService: PrismaService) {}

  async listAllCourses() {
    return await this.prismaService.course.findMany();
  }

  async getCourseById(id: string) {
    return await this.prismaService.course.findUnique({
      where: {
        id,
      },
    });
  }
}
