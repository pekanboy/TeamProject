export interface IFilter {
  search?: string;
  type?: string;
  difficult?: number[];
  days?: number[];
  sort?: string;
  distance?: number[];
  offset?: number;
  desc?: boolean;
  limit?: number;
}
