export interface ResultList{
  data: any
  statusCode: number
  metadata: Metadata
  msg: string,
  errors: Errors
}

export interface Metadata{
  pageNumber: number
  totalPages?: number
  totalRecords?: number
  pageSize: number
}

export interface Errors {
  developerMessage: string
  userMessage: string
  errorCode: string
  moreInfo: string
  stackTrace: string
  exception: string
}
