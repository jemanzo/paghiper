// PagHiper API
export const PAGHIPER_API_URL = process.env.PAGHIPER_API_URL || 'https://api.paghiper.com'
export const PAGHIPER_API_KEY = process.env.PAGHIPER_API_URL || ''
export const PAGHIPER_API_TOKEN = process.env.PAGHIPER_API_URL || ''

// HTTP Request Headers
export const REQ_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json;UTF-8'
}

// Transaction Endpoints
export const EP_TRANSACTION_CREATE = '/transaction/create/'

export const EP_TRANSACTION_CANCEL = '/transaction/cancel/'
export const EP_TRANSACTION_STATUS = '/transaction/status/'
export const EP_TRANSACTION_LIST = '/transaction/list/'

// Bank Account Endpoints
export const EP_BANK_ACCOUNT_CASHOUT = '/bank_accounts/cash_out/'
export const EP_BANK_ACCOUNT_LIST = '/bank_accounts/list/'

// Invoice Endpoints
export const EP_INVOICE_LIST = '/invoice/list/'
