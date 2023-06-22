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
    { searchFields: ["title", "year"] }
  );

  const pipeline: PipelineStage[] = [...queryFeatureStages];

  const [result]: IQueryResult<IAcademicSemester>[] =
    await AcademicSemester.aggregate<IQueryResult<IAcademicSemester>>(pipeline);

  return result;
};

const getSingleAcademicSemester = async (
  id: string,
  queryFeatures: IQueryFeatures
): Promise<Partial<IAcademicSemester> | null> => {
  const result: Partial<IAcademicSemester> | null =
    await AcademicSemester.findById(id).select(queryFeatures.fields).lean();

  return result;
};

const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<Partial<IAcademicSemester> | null> => {
  const result: Partial<IAcademicSemester> | null =
    await AcademicSemester.findByIdAndUpdate(id, payload, { new: true }).lean();

  return result;
};

const deleteAcademicSemester = async (id: string) => {
  const result: Partial<IAcademicSemester> | null =
    await AcademicSemester.findByIdAndDelete(id).lean();

  return result;
};

const academicSemesterService = {
  create,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};

export default academicSemesterService;
