import { PipelineStage } from "mongoose";
import IQueryFeatures from "../../interfaces/queryFeatures.interface";
import { IAcademicSemester, PIAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const create = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const newSemester = await AcademicSemester.create(payload);
  return newSemester;
};

interface AcademicSemesterResult {
  data: PIAcademicSemester[];
  total: number;
}

const getAcademicSemesters = async (queryFeatures: IQueryFeatures): Promise<AcademicSemesterResult> => {
  console.log(queryFeatures)
  const pipeline: PipelineStage[] = [
    {
      $match:  queryFeatures.filters
    },
    {
      $sort: queryFeatures.sort ? queryFeatures.sort : { createdAt: 1 } 
    },
    // {
    //   $project: queryFeatures.fields ? queryFeatures.fields : { _id: 1 }
    // },
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


  const [result]: AcademicSemesterResult[] = await AcademicSemester.aggregate<AcademicSemesterResult>(pipeline);


  return result
};

const academicSemesterService = {
  create, getAcademicSemesters
};

export default academicSemesterService;
