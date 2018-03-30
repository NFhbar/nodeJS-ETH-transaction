import web3 from '../web3/web3.js';
var Tx = require('ethereumjs-tx');
require('dotenv').config();

/**
 * Build a raw transaction and sign offline before sending
 *
 * @param method: method to access i.e. sendEther, sendToken, etc.
 * @param fromAddress: address to send transaction from
 * @param toAddress: address to send transaction to
 * @param nonce: Must be incremented by 1 for each transaction
 * @param functionSignature E.g. getSegmentByID(uint) in ABI code (optional)
 * @param value in wei (optional)
 * @param gasLimit as a stringed number in wei
 * @param gasPrice as a stringed number in wei
 */
function txBuilder({method, fromAddress, toAddress, nonce, functionSignature, value, gasLimit, gasPrice}) {

  //parameters in common
  //get the private key from .env
  var privateKey = new Buffer(process.env["PRIVATE_KEY"], "hex");
  //values to hex
  const nonceHex = web3.utils.toHex(nonce);
  const valueHex = web3.utils.toHex(value);
  const limitHex = web3.utils.toHex(gasLimit);
  const priceHex = web3.utils.toHex(gasPrice);
  //tx object
  let rawTx;

  //You can easily add more cases for anything you want
  switch (method) {
    case 'sendEther':
    rawTx = {
      nonce: nonceHex,
      gasPrice: priceHex,
      gasLimit: limitHex,
      to: toAddress,
      value: valueHex
    };
    break;
  }
  //new ethereumjs-tx
  var tx = new Tx(rawTx);
  //sign transaction
  tx.sign(privateKey);
  //serialize transaction
  var serializedTx = tx.serialize();

  return serializedTx;
}

export default txBuilder;
