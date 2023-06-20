import { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const create = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const newSemester = await AcademicSemester.create(payload);
  return newSemester;
};

const getAcademicSemesters = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<IAcademicSemester>> => {
  const queryFeatureStages: PipelineStage[] = makeQueryFeatureStages(
    queryFeatures,
    { searchFields: ["title", "startMonth"] }
  );

  const pipeline: PipelineStage[] = [...queryFeatureStages];

  const [result]: IQueryResult<IAcademicSemester>[] =
    await AcademicSemester.aggregate<IQueryResult<IAcademicSemester>>(pipeline);

  return result;
};

const academicSemesterService = {
  create,
  getAcademicSemesters,
};

export default academicSemesterService;
