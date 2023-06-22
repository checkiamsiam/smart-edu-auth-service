import { PipelineStage } from "mongoose";
import { IQueryFeatures } from "../interfaces/queryFeatures.interface";

interface IOptions {
  searchFields: string[];
}

const makeQueryFeatureStages = (
  queryFeatures: IQueryFeatures,
  options: IOptions
): PipelineStage[] => {
  const fieldsSelectionStage: PipelineStage =
    Object.keys(queryFeatures.fields).length > 0
      ? { $project: queryFeatures.fields }
      : {
          $addFields: {},
        };

  const searchConditions = options.searchFields.map((filed) => {
    return {
      [filed]: {
        $regex: queryFeatures.searchKey,
        $options: "i",
      },
    };
  });

  const pipeline: PipelineStage[] = [
    {
      $match: {
        $and: [
          queryFeatures.filters,
          {
            $or: searchConditions,
          },
        ],
      },
    },
    {
      $sort: queryFeatures.sort,
    },
    fieldsSelectionStage,
    {
      $facet: {
        data: [{ $skip: queryFeatures.skip }, { $limit: queryFeatures.limit }],
        total: [{ $count: "total" }],
      },
    },
    {
      $project: {
        total: { $arrayElemAt: ["$total.total", 0] },
        data: 1,
      },
    },
  ];

  return pipeline;
};

export default makeQueryFeatureStages;
