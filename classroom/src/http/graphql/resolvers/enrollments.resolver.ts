import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollment.service';
import { StudentsService } from '../../../services/students.service';

import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  async enrollments() {
    return await this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }
}
