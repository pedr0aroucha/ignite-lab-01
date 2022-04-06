import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { StudentService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    return await this.studentService.listAllStudents();
  }
}
