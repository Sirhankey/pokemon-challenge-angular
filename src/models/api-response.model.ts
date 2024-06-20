import { Card } from "./card.model";

export interface ApiResponse {
  data: Card[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}
