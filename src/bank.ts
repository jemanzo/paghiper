import { EP_BANK_ACCOUNT_CASHOUT, EP_BANK_ACCOUNT_LIST } from './constants'
import { HTTPEngine } from './http_engine'
import { validateResult } from './result'
import {
  BankAccountCashOutRequest,
  BankAccountCashOutResponse,
  BankAccountCashOutResult,
  BankAccountListRequest,
  BankAccountListResponse,
  BankAccountListResult,
  PagHiperSession
} from './types'

export const requestBankAccountCashOut = async (
  engine: HTTPEngine,
  session: PagHiperSession,
  bank_account_id: number
): Promise<BankAccountCashOutResult> => {
  const request = { ...session, bank_account_id } as BankAccountCashOutRequest
  const response = (await engine.post(EP_BANK_ACCOUNT_CASHOUT, request)) as BankAccountCashOutResponse
  const result = response.cash_out_request
  validateResult(result)
  return result
}

export const requestBankAccountList = async (
  engine: HTTPEngine,
  session: PagHiperSession
): Promise<BankAccountListResult> => {
  console.log({ name: 'maria' })
  const request = { ...session } as BankAccountListRequest
  const response = (await engine.post(EP_BANK_ACCOUNT_LIST, request)) as BankAccountListResponse
  const result = response.bank_account_list_request
  validateResult(result)
  return result
}
