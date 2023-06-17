import { PipelineStage } from "mongoose";
import { IQueryFeatures, IQueryResult } from "../../interfaces/queryFeatures.interface";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const create = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const newSemester = await AcademicSemester.create(payload);
  return newSemester;
};

const getAcademicSemesters = async (queryFeatures: IQueryFeatures): Promise<IQueryResult<IAcademicSemester>> => {
  const conditionalStage: PipelineStage = Object.keys(queryFeatures.fields).length > 0 ? { $project: queryFeatures.fields } : {
    $addFields: {}
  }
  const pipeline: PipelineStage[] = [
    {
      $match: queryFeatures.filters
    },
    {
      $sort: queryFeatures.sort
    },
    conditionalStage,
    {
      $facet: {
        data: [{ $skip: queryFeatures.skip }, { $limit: queryFeatures.limit }],
        total: [{ $count: "total" }]
      }
    },
    {
      $project: {
        total: { $arrayElemAt: ["$total.total", 0] },
        data: 1,
      }
    }
  ];


  const [result]: IQueryResult<IAcademicSemester>[] = await AcademicSemester.aggregate<IQueryResult<IAcademicSemester>>(pipeline);


  return result
};

const academicSemesterService = {
  create, getAcademicSemesters
};

export default academicSemesterService;
