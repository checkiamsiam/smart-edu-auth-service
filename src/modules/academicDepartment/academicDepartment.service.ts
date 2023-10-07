import { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import {
  AcademicDepartmentCreatedEvent,
  AcademicDepartmentUpdatedEvent,
  IAcademicDepartment,
} from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const create = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const newFaculty = await AcademicDepartment.create(payload);
  return newFaculty;
};

const getAcademicDepartments = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<IAcademicDepartment>> => {
  const queryFeatureStages: PipelineStage[] = makeQueryFeatureStages(
    queryFeatures,
    { searchFields: ["title"] }
  );

  const pipeline: PipelineStage[] = [...queryFeatureStages];

  const [result]: IQueryResult<IAcademicDepartment>[] =
    await AcademicDepartment.aggregate<IQueryResult<IAcademicDepartment>>(
      pipeline
    );

  return result;
};

const getSingleAcademicDepartment = async (
  id: string,
  queryFeatures: IQueryFeatures
): Promise<Partial<IAcademicDepartment> | null> => {
  const result: Partial<IAcademicDepartment> | null =
    await AcademicDepartment.findById(id)
      .select(queryFeatures.fields)
      .populate("academicFaculty");

  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<Partial<IAcademicDepartment> | null> => {
  const result: Partial<IAcademicDepartment> | null =
    await AcademicDepartment.findByIdAndUpdate(id, payload, {
      new: true,
    }).lean();

  return result;
};

const deleteAcademicDepartment = async (id: string) => {
  const result: Partial<IAcademicDepartment> | null =
    await AcademicDepartment.findByIdAndDelete(id).lean();

  return result;
};

const insertIntoDBFromEvent = async (
  e: AcademicDepartmentCreatedEvent
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
    syncId: e.id,
  };

  await AcademicDepartment.create(payload);
};

const updateOneInDBFromEvent = async (
  e: AcademicDepartmentUpdatedEvent
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
  };

  await AcademicDepartment.findOneAndUpdate(
    { syncId: e.id },
    {
      $set: payload,
    }
  );
};

const deleteOneFromDBFromEvent = async (syncId: string): Promise<void> => {
  await AcademicDepartment.findOneAndDelete({ syncId });
};

const academicDepartmentService = {
  create,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
  insertIntoDBFromEvent,
  updateOneInDBFromEvent,
  deleteOneFromDBFromEvent,
};

export default academicDepartmentService;
