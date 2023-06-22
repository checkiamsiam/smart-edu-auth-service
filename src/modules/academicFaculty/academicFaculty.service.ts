import { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const create = async (payload: IAcademicFaculty): Promise<IAcademicFaculty> => {
  const newFaculty = await AcademicFaculty.create(payload);
  return newFaculty;
};

const getAcademicFaculties = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<IAcademicFaculty>> => {
  const queryFeatureStages: PipelineStage[] = makeQueryFeatureStages(
    queryFeatures,
    { searchFields: ["title"] }
  );

  const pipeline: PipelineStage[] = [...queryFeatureStages];

  const [result]: IQueryResult<IAcademicFaculty>[] =
    await AcademicFaculty.aggregate<IQueryResult<IAcademicFaculty>>(pipeline);

  return result;
};

const getSingleAcademicFaculty = async (
  id: string,
  queryFeatures: IQueryFeatures
): Promise<Partial<IAcademicFaculty> | null> => {
  const result: Partial<IAcademicFaculty> | null =
    await AcademicFaculty.findById(id).select(queryFeatures.fields).lean();

  return result;
};

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<Partial<IAcademicFaculty> | null> => {
  const result: Partial<IAcademicFaculty> | null =
    await AcademicFaculty.findByIdAndUpdate(id, payload, { new: true }).lean();

  return result;
};

const deleteAcademicFaculty = async (id: string) => {
  const result: Partial<IAcademicFaculty> | null =
    await AcademicFaculty.findByIdAndDelete(id).lean();

  return result;
};

const academicFacultyService = {
  create,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};

export default academicFacultyService;
