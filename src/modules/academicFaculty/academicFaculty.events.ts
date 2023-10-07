import { redis } from "../../utils/redis.util";
import {
  AcademicFacultyCreatedEvent,
  AcademicFacultyDeletedEvent,
  AcademicFacultyUpdatedEvent,
} from "./academicFaculty.interface";
import academicFacultyService from "./academicFaculty.service";
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_DELETED,
  EVENT_ACADEMIC_FACULTY_UPDATED,
} from "./academicFacutly.constant";

const initAcademicFacultyEvents = () => {
  redis.subscribe(EVENT_ACADEMIC_FACULTY_CREATED, async (e: string) => {
    const data: AcademicFacultyCreatedEvent = JSON.parse(e);

    await academicFacultyService.insertIntoDBFromEvent(data);
  });

  redis.subscribe(EVENT_ACADEMIC_FACULTY_UPDATED, async (e: string) => {
    const data: AcademicFacultyUpdatedEvent = JSON.parse(e);

    await academicFacultyService.updateOneInDBFromEvent(data);
  });

  redis.subscribe(EVENT_ACADEMIC_FACULTY_DELETED, async (e: string) => {
    const data: AcademicFacultyDeletedEvent = JSON.parse(e);

    await academicFacultyService.deleteOneFromDBFromEvent(data.id);
  });
};

export default initAcademicFacultyEvents;
