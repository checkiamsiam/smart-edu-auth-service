import { redis } from "../../utils/redis.util";
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_DELETED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from "./academicSemester.constant";
import { IAcademicSemesterCreatedEvent } from "./academicSemester.interface";
import academicSemesterService from "./academicSemester.service";

const initAcademicSemesterEvents = () => {
  redis.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);

    await academicSemesterService.createSemesterFromEvent(data);
  });

  redis.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    await academicSemesterService.updateOneIntoDBFromEvent(data);
  });

  redis.subscribe(EVENT_ACADEMIC_SEMESTER_DELETED, async (e: string) => {
    const data = JSON.parse(e);

    await academicSemesterService.deleteOneFromDBFromEvent(data.id);
  });
};

export default initAcademicSemesterEvents;
