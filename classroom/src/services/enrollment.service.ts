import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type GetByCourseAndStudentIdParams = {
  courseId: string;
  studentId: string;
};

@Injectable()
export class EnrollmentsService {
  constructor(private prismaService: PrismaService) {}

  async getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return await this.prismaService.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  async listAllEnrollments() {
    return await this.prismaService.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getEnrollmentById(id: string) {
    return await this.prismaService.enrollment.findUnique({
      where: {
        id,
      },
    });
  }

  async listEnrollmentsByStudent(studentId: string) {
    return await this.prismaService.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
