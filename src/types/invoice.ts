import { PagHiperSession, Result } from '.'

export enum InvoiceType {
  tarifa = 'tarifa',
  saque = 'saque'
}

export interface Invoice {
  invoice_id: number
  invoice_cod: string
  invoice_value_cents: number // R$ 1.901,95 => 190195
  invoice_date: Date // 2018-01-31
  invoice_customer: string
  invoice_customer_id: number
  invoice_url: string
  invoice_description: string
  invoice_type: InvoiceType
}

// RESULT

export interface InvoiceListResult extends Result {
  current_page: number
  total_page: number
  invoice_list: Invoice[]
}

// HTTP_REQUEST

export interface InvoiceListRequest extends PagHiperSession {}

// HTTP_RESPONSE

export interface InvoiceListResponse {
  invoice_list_request: InvoiceListResult
}
