import { redis } from "../../utils/redis.util";
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from "./academicDepartment.constant";
import {
  AcademicDepartmentCreatedEvent,
  AcademicDepartmentDeletedEvent,
  AcademicDepartmentUpdatedEvent,
} from "./academicDepartment.interface";
import academicDepartmentService from "./academicDepartment.service";

const initAcademicDepartmentEvents = () => {
  redis.subscribe(EVENT_ACADEMIC_DEPARTMENT_CREATED, async (e: string) => {
    const data: AcademicDepartmentCreatedEvent = JSON.parse(e);

    await academicDepartmentService.insertIntoDBFromEvent(data);
  });

  redis.subscribe(EVENT_ACADEMIC_DEPARTMENT_UPDATED, async (e: string) => {
    const data: AcademicDepartmentUpdatedEvent = JSON.parse(e);

    await academicDepartmentService.updateOneInDBFromEvent(data);
  });

  redis.subscribe(EVENT_ACADEMIC_DEPARTMENT_DELETED, async (e: string) => {
    const data: AcademicDepartmentDeletedEvent = JSON.parse(e);

    await academicDepartmentService.deleteOneFromDBFromEvent(data.id);
  });
};

export default initAcademicDepartmentEvents;
