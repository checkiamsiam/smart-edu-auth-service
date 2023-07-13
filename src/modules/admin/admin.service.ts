import { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const getAdmins = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<IAdmin>> => {
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

  const [result]: IQueryResult<IAdmin>[] = await Admin.aggregate<
    IQueryResult<IAdmin>
  >(pipeline);

  return result;
};

const getSingleAdmin = async (
  id: string,
  queryFeatures: IQueryFeatures
): Promise<Partial<IAdmin> | null> => {
  const result: Partial<IAdmin> | null = await Admin.findById(id)
    .select(queryFeatures.fields)
    .populate([{ path: "managementDepartment" }])
    .lean();

  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<Partial<IAdmin> | null> => {
  const { name, ...otherPayloads } = payload;

  const updatingPayload: Partial<IAdmin> & { [key: string]: any } = {
    ...otherPayloads,
  };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      updatingPayload[`name.${key}`] = name[key as keyof typeof name];
    });
  }

  const result: Partial<IAdmin> | null = await Admin.findByIdAndUpdate(
    id,
    updatingPayload,
    { new: true }
  ).lean();

  return result;
};

const adminServices = { getAdmins, getSingleAdmin, updateAdmin };

export default adminServices;
