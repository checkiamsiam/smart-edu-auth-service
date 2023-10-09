import { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { redis } from "../../utils/redis.util";
import { EVENT_STUDENT_UPDATED } from "./student.constant";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const getStudents = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<IStudent>> => {
  const queryFeatureStages: PipelineStage[] = makeQueryFeatureStages(
    queryFeatures,
    {
      searchFields: [
        "id",
        "email",
        "contactNo",
        "name.firstName",
        "name.middleName",
        "name.lastName",
      ],
    }
  );

  const pipeline: PipelineStage[] = [...queryFeatureStages];

  const [result]: IQueryResult<IStudent>[] = await Student.aggregate<
    IQueryResult<IStudent>
  >(pipeline);

  return result;
};

const getSingleStudent = async (
  id: string,
  queryFeatures: IQueryFeatures
): Promise<Partial<IStudent> | null> => {
  const result: Partial<IStudent> | null = await Student.findById(id)
    .select(queryFeatures.fields)
    .populate([
      { path: "academicSemester" },
      { path: "academicDepartment" },
      { path: "academicFaculty" },
    ])
    .lean();

  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<Partial<IStudent> | null> => {
  const { name, guardian, localGuardian, ...otherPayloads } = payload;

  const updatingPayload: Partial<IStudent> & { [key: string]: any } = {
    ...otherPayloads,
  };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      updatingPayload[`name.${key}`] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach((key) => {
      updatingPayload[`guardian.${key}`] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach((key) => {
      updatingPayload[`localGuardian.${key}`] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result: Partial<IStudent> | null = await Student.findByIdAndUpdate(
    id,
    updatingPayload,
    { new: true }
  ).lean();

  if (result) {
    await redis.publish(EVENT_STUDENT_UPDATED, JSON.stringify(result));
  }

  return result;
};

const studentServices = { getStudents, getSingleStudent, updateStudent };

export default studentServices;
