import { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { IManagementDepartment } from "./managementDepartment.interface";
import { ManagementDepartment } from "./managementDepartment.model";

const create = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const newFaculty = await ManagementDepartment.create(payload);
  return newFaculty;
};

const getManagementDepartments = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<IManagementDepartment>> => {
  const queryFeatureStages: PipelineStage[] = makeQueryFeatureStages(
    queryFeatures,
    { searchFields: ["title"] }
  );

  const pipeline: PipelineStage[] = [...queryFeatureStages];

  const [result]: IQueryResult<IManagementDepartment>[] =
    await ManagementDepartment.aggregate<IQueryResult<IManagementDepartment>>(
      pipeline
    );

  return result;
};

const getSingleManagementDepartment = async (
  id: string,
  queryFeatures: IQueryFeatures
): Promise<Partial<IManagementDepartment> | null> => {
  const result: Partial<IManagementDepartment> | null =
    await ManagementDepartment.findById(id).select(queryFeatures.fields);

  return result;
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<Partial<IManagementDepartment> | null> => {
  const result: Partial<IManagementDepartment> | null =
    await ManagementDepartment.findByIdAndUpdate(id, payload, {
      new: true,
    }).lean();

  return result;
};

const deleteManagementDepartment = async (id: string) => {
  const result: Partial<IManagementDepartment> | null =
    await ManagementDepartment.findByIdAndDelete(id).lean();

  return result;
};

const managementDepartmentService = {
  create,
  getManagementDepartments,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};

export default managementDepartmentService;
