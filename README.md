# PagHiper API - Client

Módulo cliente para conexão com a API da empresa [PagHiper](http://paghiper.com.br) para emissão e controle de boletos bancários, desenvolvido em NodeJS.

## Instalação

```shell
npm install paghiper
```

## Documentação

```javascript
const PagHiperAPI = require('paghiper')
const apikey = 'apk_XYZ...'
const token = 'ABCD...'
const paghiper = new PagHiperAPI(apiKey, token)
```

### Boleto Bancário

Criar um boleto

```javascript
const result = await paghiper.createTransaction(boletoDados)
```

Cancelar um boleto existente

```javascript
const transaction_id = 'XYZ0001'
const result = await paghiper.cancelTransaction(transaction_id)
```

Verificar situação atual do boleto

```javascript
const transaction_id = 'XYZ0001'
const result = await paghiper.getTransactionStatus(transaction_id)
```

### Conta Bancária

Listar Contas Bancárias

```javascript
const result = await paghiper.getBankAccounts()
```

Solicitar Saque

```javascript
const conta_id = 123456
const result = await paghiper.requestCashOut(conta_id)
```

### Nota Fiscal

Listar Notas Fiscais emitidas pela PagHiper referente as taxas cobradas pelos aos serviços prestados.

```javascript
const result = await paghiper.getInvoices()
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
