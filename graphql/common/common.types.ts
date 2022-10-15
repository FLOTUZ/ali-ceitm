export interface Args {
  pagination?: Pagination;
}

export interface Pagination {
  take?: number;
  skip?: number;
}
