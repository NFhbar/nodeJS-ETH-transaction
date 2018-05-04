import web3 from '../web3/web3.js'
import txBuilder from './tx_builder'
import {sender_account, receiver_account} from '../accounts/accounts'

/**
 * send Ether through a signed transaction function.
 *
 * @param value: amount to send. For demo purposes is static but it will be dynamic based on backend call.
 * @param gasLimit: get the gas limit of proposed transaction (wei).
 * @param gasPrice: get the current gas price (wei).
 * @param nonce: get the nonce for sending account.
 * @param privateKey for signing transacion.
 * @param txData: data object to pass to txBuilder.
 */
async function sendEther() {
    //make the value dynamic if you like
    const value = web3.utils.toWei('20', 'ether')
    //get the gas limit by using estimageGas function (wei)
    const gasLimit = await web3.eth.estimateGas({ from: sender_account, to: receiver_account, amount: value })
    //get the current gas price (wei)
    const gasPrice = await web3.eth.getGasPrice()
    //get the nonce for the sending account
    const nonce = await web3.eth.getTransactionCount(sender_account)
    //Specifiy private key
    const privateKey = 'PRIVATE_KEY'
    //optional logs for sanity checks
    console.log('Building Transaction') // eslint-disable-line no-console
    //build transaction object -- see tx_builder.js for input parameters
    let txData = {
        method: 'sendEther',
        toAddress: receiver_account,
        nonce: nonce,
        value: value,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        privateKey: privateKey
    }

    try {
    //pass transaction object to txBuilder to construct and sign using private key
        let rawTx = txBuilder(txData)
        //optional logs for sanity checks
        console.log('Sending Signed Transaction') // eslint-disable-line no-console
        //send tx that was signed offline by txbuilder
        await web3.eth.sendSignedTransaction('0x' + rawTx.toString('hex'))
            .on('receipt', console.log) // eslint-disable-line no-console
    } catch (error) {
        console.log(error) // eslint-disable-line no-console
    }

}

export default sendEther
