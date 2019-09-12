export enum DateFilter {
  createdDate = 'create_date',
  paidDate = 'paid_date'
}

export enum ValueCentsFilter {
  eq = '=',
  gte = '>=',
  lte = '<=',
  gt = '>',
  lt = '<'
}

export interface PagHiperSession {
  apiKey: string
  token: string
}

export enum ResultStatus {
  success = 'success',
  reject = 'reject'
}

export interface Result {
  result: ResultStatus
  response_message: string
  http_code: string
}

export * from './bank'
export * from './transaction'
export * from './invoice'
