import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import userService from "./user.service";

const generateNewStudentID = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const lastIdWithSignatures = await userService.getLastStudentId();
  const lastId = lastIdWithSignatures
    ? lastIdWithSignatures.slice(4)
    : (0).toString().padStart(6, "0");
  const incrementedId = (parseInt(lastId) + 1).toString().padStart(6, "0");
  return `${academicSemester.year.toString().slice(2)}${
    academicSemester.code
  }${incrementedId}`;
};
const generateNewFacultyID = async (): Promise<string> => {
  const lastIdWithSignatures = await userService.getLastFacultyId();
  const lastId = lastIdWithSignatures
    ? lastIdWithSignatures.slice(2)
    : (0).toString().padStart(6, "0");
  const incrementedId = (parseInt(lastId) + 1).toString().padStart(6, "0");
  return `F-${incrementedId}`;
};
const generateNewAdminID = async (): Promise<string> => {
  const lastIdWithSignatures = await userService.getLastAdminId();
  const lastId = lastIdWithSignatures
    ? lastIdWithSignatures.slice(2)
    : (0).toString().padStart(6, "0");
  const incrementedId = (parseInt(lastId) + 1).toString().padStart(6, "0");
  return `A-${incrementedId}`;
};
const generateNewSuperAdminID = async (): Promise<string> => {
  const lastIdWithSignatures = await userService.getLastSuperAdminId();
  const lastId = lastIdWithSignatures
    ? lastIdWithSignatures.slice(2)
    : (0).toString().padStart(6, "0");
  const incrementedId = (parseInt(lastId) + 1).toString().padStart(6, "0");
  return `S-${incrementedId}`;
};

const userUtils = {
  generateNewStudentID,
  generateNewFacultyID,
  generateNewAdminID,
  generateNewSuperAdminID,
};

export default userUtils;
