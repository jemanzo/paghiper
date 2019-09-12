import { post } from 'got'
import { OutgoingHttpHeaders } from 'http'

import { validateResponse } from './response'

interface HTTPEngineRequest {
  baseUrl: string
  headers: object
}

export interface HTTPEngineResponse {
  statusCode: string | number
  body: string | number
}

export class HTTPEngine {
  private _request: HTTPEngineRequest

  public constructor(baseUrl: string, headers: object) {
    this._request = { baseUrl, headers }
  }

  public async post(endpoint: string, requestBody: object): Promise<object> {
    const options = {
      baseUrl: this._request.baseUrl,
      headers: this._request.headers as OutgoingHttpHeaders,
      body: JSON.stringify(requestBody)
    }
    const response = await post(endpoint, options)
    validateResponse(response)
    return typeof response.body === 'string' ? JSON.parse(response.body) : response.body
  }
}
