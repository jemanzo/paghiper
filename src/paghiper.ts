import { requestBankAccountCashOut, requestBankAccountList } from './bank'
import { PAGHIPER_API_URL, REQ_HEADERS } from './constants'
import { HTTPEngine } from './http_engine'
import { requestInvoiceList } from './invoice'
import {
  requestTransactionCancellation,
  requestTransactionCreation,
  requestTransactionsList,
  requestTransactionStatus
} from './transaction'
import {
  BankAccountCashOutResult,
  BankAccountListResult,
  InvoiceListResult,
  PagHiperSession,
  Transaction,
  TransactionCancelResult,
  TransactionCreateResult,
  TransactionFilter,
  TransactionListResult,
  TransactionStatusResult
} from './types'

export class PagHiperAPI {
  public baseUrl = PAGHIPER_API_URL
  public headers = REQ_HEADERS
  private _session: PagHiperSession
  private _http: HTTPEngine

  public constructor(apiKey: string, token: string) {
    this.validateAPIKey(apiKey)
    this._session = { apiKey, token }
    this._http = new HTTPEngine(this.baseUrl, this.headers)
  }

  public validateAPIKey(apiKey: string): void {
    if (apiKey.substr(0, 4) !== 'apk_') {
      throw new Error('request.apikey.invalid')
    }
  }

  public async createTransaction(transaction: Transaction): Promise<TransactionCreateResult> {
    return requestTransactionCreation(this._http, this._session, transaction)
  }

  public async cancelTransaction(transaction_id: string): Promise<TransactionCancelResult> {
    return requestTransactionCancellation(this._http, this._session, transaction_id)
  }

  public async getTransactionStatus(transaction_id: string): Promise<TransactionStatusResult> {
    return requestTransactionStatus(this._http, this._session, transaction_id)
  }

  public async getTransactions(filter?: TransactionFilter): Promise<TransactionListResult> {
    return requestTransactionsList(this._http, this._session, filter)
  }

  public async getInvoices(): Promise<InvoiceListResult> {
    return requestInvoiceList(this._http, this._session)
  }

  public async requestCashOut(bank_account_id: number): Promise<BankAccountCashOutResult> {
    return requestBankAccountCashOut(this._http, this._session, bank_account_id)
  }

  public async getBankAccounts(): Promise<BankAccountListResult> {
    return requestBankAccountList(this._http, this._session)
  }
}
