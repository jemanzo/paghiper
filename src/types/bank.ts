import { PagHiperSession, Result } from '.'

export enum BankSlipOption {
  boletoA4 = 'boletoA4',
  boletoCarne = 'boletoCarne'
}

export interface BankSlip {
  digitable_line: string
  url_slip: string
  url_slip_pdf: string
}

export enum BankAccountType {
  corrente = 'Corrente',
  poupanca = 'Poupanca'
}

export interface BankAccount {
  bank_code: number
  bank_name: string
  bank_account_id: number
  account_type: BankAccountType
}

// HTTP REQUEST

export interface BankAccountCashOutRequest extends PagHiperSession {
  bank_account_id: number
}

export interface BankAccountListRequest extends PagHiperSession {}

// HTTP_RESPONSE

export interface BankAccountCashOutResponse {
  cash_out_request: BankAccountCashOutResult
}

export interface BankAccountListResponse {
  bank_account_list_request: BankAccountListResult
}

// RESULT

export interface BankAccountCashOutResult extends Result {
  cash_out_value_cents: number
  cash_out_fee_cents: number
}

export interface BankAccountListResult extends Result {
  bank_account_list: BankAccount
}
