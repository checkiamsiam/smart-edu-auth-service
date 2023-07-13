import { PipelineStage } from "mongoose";
import makeQueryFeatureStages from "../../helpers/mongooseAggrigationQueryFeatures.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import { IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";

const getFaculties = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<IFaculty>> => {
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

  const [result]: IQueryResult<IFaculty>[] = await Faculty.aggregate<
    IQueryResult<IFaculty>
  >(pipeline);

  return result;
};

const getSingleFaculty = async (
  id: string,
  queryFeatures: IQueryFeatures
): Promise<Partial<IFaculty> | null> => {
  const result: Partial<IFaculty> | null = await Faculty.findById(id)
    .select(queryFeatures.fields)
    .populate([{ path: "academicDepartment" }, { path: "academicFaculty" }])
    .lean();

  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<Partial<IFaculty> | null> => {
  const { name, ...otherPayloads } = payload;

  const updatingPayload: Partial<IFaculty> & { [key: string]: any } = {
    ...otherPayloads,
  };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      updatingPayload[`name.${key}`] = name[key as keyof typeof name];
    });
  }

  const result: Partial<IFaculty> | null = await Faculty.findByIdAndUpdate(
    id,
    updatingPayload,
    { new: true }
  ).lean();

  return result;
};

const facultyServices = { getFaculties, getSingleFaculty, updateFaculty };

export default facultyServices;
