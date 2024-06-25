import { TCard } from "./card.model";

export interface ApiResponse {
  data: TCard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

export interface ApiTypesResponse {
  data: string[];
}
