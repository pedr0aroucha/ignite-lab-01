import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

type createCourseParams = {
  title: string;
};

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

  async createCourse({ title }: createCourseParams) {
    const slug = slugify(title, { lower: true });

    const courseAlreadyExists = await this.prismaService.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists.');
    }

    return await this.prismaService.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
