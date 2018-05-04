import web3 from './helpers/web3'
import {sender_account, receiver_account} from './helpers/accounts'
const Tx = require('ethereumjs-tx')
import txBuilder from './mocks/tx_builder_mock'

test('builds a transaction correctly', async () => {

    //Constants
    const privateKey = 'PRIVATE_KEY_TEST'
    const method = 'sendEther'
    const value = 10000
    let gasLimit =  await web3.eth.estimateGas( {from: sender_account, to:receiver_account, amount: value} )
    let gasPrice = 1000000
    let nonce =  await web3.eth.getTransactionCount(sender_account)
    const functionABI = 'null'

    let txData = {
        method: method,
        fromAddress: sender_account,
        toAddress: receiver_account,
        nonce: nonce,
        functionSignature: functionABI,
        value: value,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        privateKey: privateKey
    }

    const rawTx = txBuilder(txData)

    txData = {
        to: receiver_account,
        nonce: web3.utils.toHex(nonce),
        gasLimit: web3.utils.toHex(gasLimit),
        gasPrice: web3.utils.toHex(gasPrice),
        value: web3.utils.toHex(value),
    }

    var tx = new Tx(txData)
    tx.sign(new Buffer(process.env[privateKey], 'hex'))

    expect(rawTx).toEqual(tx.serialize())

})
