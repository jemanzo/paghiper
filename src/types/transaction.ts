import { DateFilter, PagHiperSession, Result, ValueCentsFilter } from '.'
import { BankSlip, BankSlipOption } from './bank'

export enum TransactionStatusInfo {
  pending = 'pending',
  reserved = 'reserved',
  canceled = 'canceled',
  completed = 'completed',
  paid = 'paid',
  processing = 'processing',
  refunded = 'refunded'
}

export interface TransactionItem {
  item_id: string
  description: string
  quantity: number
  price_cents: number
}

export interface Transaction {
  order_id: string // código interno do lojista para identificar a transacao.
  payer_email: string
  payer_name: string // nome completo ou razao social
  payer_cpf_cnpj: string
  payer_phone?: string // fixou ou móvel
  payer_street?: string
  payer_number?: string
  payer_complement?: string
  payer_district?: string
  payer_city?: string
  payer_state?: string // apenas sigla do estado
  payer_zip_code?: string
  days_due_date: number // dias para vencimento do boleto
  type_bank_slip: BankSlipOption
  notification_url?: string // https://mysite.com/notification/paghiper/
  discount_cents?: number
  shipping_price_cents?: string
  shipping_methods?: string // SEDEX, SEDEX10, PAC, TRANSPORTADORA, MOTOBOY, RETIRADA NO LOCAL, etc.
  partners_id?: string
  number_ntfiscal?: number // Número da nota fiscal
  fixed_description?: boolean
  seller_description?: string // Frase mutável do vendedor
  late_payment_fine?: number // Percentual de multa após vencimento
  per_day_interest?: boolean // Juros após vencimento
  early_payment_discounts_days?: number
  early_payment_discounts_cents?: number
  open_after_day_due?: number
  items: TransactionItem[]
}

export interface TransactionFilter {
  status?: TransactionStatusInfo
  initial_date?: string
  final_date?: string
  filter_date?: DateFilter
  due_date?: string
  order_id?: string
  value_cents?: number
  value_cents_filter?: ValueCentsFilter
  limit?: number
  page?: number
}

// RESULT

export interface TransactionCreateResult extends Result {
  transaction_id: string
  created_date: string // 2019-10-20 21:00:00
  value_cents: string // 192.87 => 19287
  status: TransactionStatusInfo
  order_id: string
  due_date: string // 2019-11-20
  bank_slip: BankSlip
}

export interface TransactionCancelResult extends Result {}

export interface TransactionStatusResult extends Result {
  order_id: string
  status: TransactionStatusInfo
  status_date: Date // Data da última alteração do status
  due_date: Date // Data do vencimento do boleto
  value_cents: number // 456.93 => 45693
  value_cents_paid?: number // Valor final da transação em centavos, contendo juros e multas, ou desconto de pagamento antecipado
  late_payment_fine: number // Percentual da multa
  per_day_interest: boolean
  early_payment_discounts_days?: number
  early_payment_discounts_cents?: number
  open_after_day_due: number // 5 ~ 30
  bank_slip: BankSlip
}

export interface TransactionListResult extends Result {
  current_page: number
  total_page: number
  transaction_list: Transaction[]
}

// HTTP_REQUEST

export interface TransactionCreateRequest extends Transaction {
  apiKey: string
}

export interface TransactionStatusRequest extends PagHiperSession {
  transaction_id: string
}

export interface TransactionCancelRequest extends PagHiperSession {
  status: TransactionStatusInfo.canceled
  transaction_id: string
}

export interface TransactionListRequest extends PagHiperSession, TransactionFilter {}

// HTTP_RESPONSE

export interface TransactionCreateResponse {
  create_request: TransactionCreateResult
}

export interface TransactionCancelResponse {
  cancel_request: TransactionCancelResult
}

export interface TransactionStatusResponse {
  status_request: TransactionStatusResult
}

export interface TransactionListResponse {
  transaction_list_request: TransactionListResult
}
