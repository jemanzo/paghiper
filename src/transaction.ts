import { EP_TRANSACTION_CANCEL, EP_TRANSACTION_CREATE, EP_TRANSACTION_LIST, EP_TRANSACTION_STATUS } from './constants'
import { HTTPEngine } from './http_engine'
import { validateResult } from './result'
import {
  PagHiperSession,
  Transaction,
  TransactionCancelRequest,
  TransactionCancelResponse,
  TransactionCancelResult,
  TransactionCreateRequest,
  TransactionCreateResponse,
  TransactionCreateResult,
  TransactionFilter,
  TransactionListRequest,
  TransactionListResponse,
  TransactionListResult,
  TransactionStatusInfo,
  TransactionStatusRequest,
  TransactionStatusResponse,
  TransactionStatusResult
} from './types'

export const requestTransactionCreation = async (
  engine: HTTPEngine,
  session: PagHiperSession,
  transaction: Transaction
): Promise<TransactionCreateResult> => {
  const request = { ...session, ...transaction } as TransactionCreateRequest
  const response = (await engine.post(EP_TRANSACTION_CREATE, request)) as TransactionCreateResponse
  const result = response.create_request
  validateResult(result)
  return result
}

export const requestTransactionCancellation = async (
  engine: HTTPEngine,
  session: PagHiperSession,
  transaction_id: string
): Promise<TransactionCancelResult> => {
  const request = { ...session, status: TransactionStatusInfo.canceled, transaction_id } as TransactionCancelRequest
  const response = (await engine.post(EP_TRANSACTION_CANCEL, request)) as TransactionCancelResponse
  const result = response.cancel_request
  validateResult(result)
  return result
}

export const requestTransactionStatus = async (
  engine: HTTPEngine,
  session: PagHiperSession,
  transaction_id: string
): Promise<TransactionStatusResult> => {
  const request = { ...session, transaction_id } as TransactionStatusRequest
  const response = (await engine.post(EP_TRANSACTION_STATUS, request)) as TransactionStatusResponse
  const result = response.status_request
  validateResult(result)
  return result
}

export const requestTransactionsList = async (
  engine: HTTPEngine,
  session: PagHiperSession,
  filter?: TransactionFilter
): Promise<TransactionListResult> => {
  const request = { ...session, ...filter } as TransactionListRequest
  const response = (await engine.post(EP_TRANSACTION_LIST, request)) as TransactionListResponse
  const result = response.transaction_list_request
  validateResult(result)
  return result
}
