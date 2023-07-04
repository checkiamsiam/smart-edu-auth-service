import { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
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
        "name.fisrtName",
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
  const result: Partial<IStudent> | null = await Student.findByIdAndUpdate(
    id,
    payload,
    { new: true }
  ).lean();

  return result;
};

const studentServices = { getStudents, getSingleStudent, updateStudent };

export default studentServices;
