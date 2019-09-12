import { EP_TRANSACTION_STATUS } from '../constants'

const statusRequest = require('./status_request.json') // eslint-disable-line

export const post = (endpoint: string, requestBody: object): Promise<object> => {
  return new Promise((resolve, reject): void => {
    if (endpoint === EP_TRANSACTION_STATUS) {
      return resolve({
        statusCode: 201,
        body: statusRequest
      })
    }
    return reject()
  })
}
