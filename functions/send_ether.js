import web3 from '../web3/web3.js';
import txBuilder from './tx_builder';
import {sender_account, receiver_account} from '../accounts/accounts';

/**
 * send Ether through a signed transaction function.
 *
 * @param accounts: array containing account to send ether to. For demo purposes is static but in production it will be dynamic based on user input
 * @param value: amount to send. For demo purposes is static but it will be dynamic based on backend call.
 * @param gasLimit: get the gas limit of proposed transaction (wei).
 * @param gasPrice: get the current gas price (wei).
 * @param nonce: get the nonce for sending account.
 * @param txData: data object to pass to txBuilder.
 */
async function sendEther() {
  console.log(await web3.eth.getBalance(sender_account));
  //make the value dynamic if you like
  const value = web3.utils.toWei('20', "ether");
  //get the gas limit by using estimageGas function (wei)
  const gasLimit = await web3.eth.estimateGas({ from: sender_account, to: receiver_account, amount: value });
  //get the current gas price (wei)
  const gasPrice = await web3.eth.getGasPrice();
  //get the nonce for the sending account
  const nonce = await web3.eth.getTransactionCount(sender_account);
  //optional logs for sanity checks
  console.log('Building Transaction');
  //build transaction object -- see tx_builder.js for input parameters
  let txData = {
    method: 'sendEther',
    fromAddress: sender_account,
    toAddress: receiver_account,
    nonce: nonce,
    functionSignature: null,
    value: value,
    gasLimit: gasLimit,
    gasPrice: gasPrice,
  };

  try {
    //pass transaction object to txBuilder to construct and sign using private key
    let rawTx = txBuilder(txData);
    //optional logs for sanity checks
    console.log('Sending Signed Transaction');
    //send tx that was signed offline by txbuilder
    await web3.eth.sendSignedTransaction('0x' + rawTx.toString('hex'))
      .on('receipt', console.log);
  } catch (error) {
    console.log(error);
  }

}

export default sendEther;
