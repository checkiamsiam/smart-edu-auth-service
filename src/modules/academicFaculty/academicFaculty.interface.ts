import { Model } from "mongoose";

export interface IAcademicFaculty {
  title: string;
  syncId: string;
}

export type AcademicFacultyCreatedEvent = {
  id: string;
  title: string;
};

export type AcademicFacultyUpdatedEvent = {
  id: string;
  title: string;
};

export type AcademicFacultyDeletedEvent = {
  id: string;
};

export type AcademicFacultyModel = Model<IAcademicFaculty, object>;
