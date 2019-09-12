import { HTTPEngineResponse } from './http_engine'

export class PagHiperResponseError extends Error {
  public messageDetail: string

  public constructor(public messageURI: string, public response: HTTPEngineResponse | null) {
    super(messageURI)
    this.messageDetail = messageURIToMessage(messageURI)
    this.response = response
  }
}

function messageURIToMessage(msgURI: string): string {
  if (msgURI.substr(0, 7) !== 'result.') {
    return ''
  }
  const errorCode = +msgURI.substr(23, 3)

  switch (errorCode) {
    case 200:
      return 'Requisição recebida, porém, não pode ser consultada devido as regras de negócio aplicada'
    case 201:
      return 'Transação encontrada'
    case 400:
      return 'Conteúdo da mensagem vazio ou mal formatado'
    case 401:
      return 'Credenciais para acessar o endpoint estão incorretas'
    case 405:
      return 'Credenciais para acessar o endpoint estão incorretas'
    case 415:
      return 'Conteúdo não suportado: use application/json'
  }
  return ''
}
