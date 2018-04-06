import web3 from './helpers/web3'
import {sender_account, receiver_account} from './helpers/accounts'
var Tx = require('ethereumjs-tx')
import sendEther from './mocks/send_ether_mock'

test('sends ether correctly', async () => {

    //Constants
    const initialBalanceSender =  await web3.eth.getBalance(sender_account)
    console.log(initialBalanceSender)
    const initialBalanceReceiver =  await web3.eth.getBalance(receiver_account)
    console.log(initialBalanceReceiver)

    const value = web3.utils.toWei('20', "ether");
    console.log(value)
    //send ether
    try {
      await sendEther()

    } catch (error) {
      console.log(error);
    }

    const newBalanceReceived = await web3.eth.getBalance(receiver_account)
    const newBalance = web3.utils.toBN(initialBalanceReceiver).add(web3.utils.toBN(value)).toString();
    expect(newBalanceReceived).toEqual(newBalance)

});
