import web3 from '../helpers/web3.js'
var Tx = require('ethereumjs-tx')
require('dotenv').config()

/**
 * Build a raw transaction and sign offline before sending
 *
 * @param method: method to access i.e. sendEther, sendToken, etc.
 * @param toAddress: address to send transaction to.
 * @param nonce: Must be incremented by 1 for each transaction.
 * @param value in wei (optional).
 * @param gasLimit as a stringed number in wei.
 * @param gasPrice as a stringed number in wei.
 * @param privateKey for signing transacion.
 */
function txBuilder({method, toAddress, nonce, value, gasLimit, gasPrice, privateKey}) {

    //parameters in common
    //get the private key from .env
    const privateKeyHex = new Buffer(process.env[privateKey], 'hex')
    //values to hex
    const nonceHex = web3.utils.toHex(nonce)
    const valueHex = web3.utils.toHex(value)
    const limitHex = web3.utils.toHex(gasLimit)
    const priceHex = web3.utils.toHex(gasPrice)
    //tx object
    let rawTx

    //You can easily add more cases for anything you want
    switch (method) {
    case 'sendEther':
        rawTx = {
            nonce: nonceHex,
            gasPrice: priceHex,
            gasLimit: limitHex,
            to: toAddress,
            value: valueHex
        }
        break
    }
    //new ethereumjs-tx
    var tx = new Tx(rawTx)
    //sign transaction
    tx.sign(privateKeyHex)
    //serialize transaction
    var serializedTx = tx.serialize()

    return serializedTx
}

export default txBuilder
