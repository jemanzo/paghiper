import { EP_INVOICE_LIST } from './constants'
import { HTTPEngine } from './http_engine'
import { validateResult } from './result'
import { InvoiceListRequest, InvoiceListResponse, InvoiceListResult, PagHiperSession } from './types'

export const requestInvoiceList = async (engine: HTTPEngine, session: PagHiperSession): Promise<InvoiceListResult> => {
  const request = { ...session } as InvoiceListRequest
  const response = (await engine.post(EP_INVOICE_LIST, request)) as InvoiceListResponse
  const result = response.invoice_list_request
  validateResult(result)
  return result
}
