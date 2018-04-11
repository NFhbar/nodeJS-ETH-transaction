# NodeJS Ethereum Transaction

<div>

[![Build Status](https://travis-ci.org/NFhbar/nodeJS-ETH-transaction.png?branch=master)](https://travis-ci.org/NFhbar/nodeJS-ETH-transaction)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/NFhbar/nodeJS-ETH-transaction/issues)

</div>


Sends Ether from one account to another using an off-line signing transaction method through [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx).
Currently runs on Ganache but you could easily set it up for your own [geth node](https://github.com/ethereum/go-ethereum/wiki/geth).
Transaction builder with switch cases if you want to add support for other type of transactions.
Medium article [here](https://medium.com/@NicoFrega/sign-an-ethereum-transaction-off-line-d3e38fbda677).

# Install
- Clone repo to local machine
- ```$ npm install```

# Requirements
- Install [Ganache](http://truffleframework.com/ganache/).

# Setup Local Environment
- Start your Ganache instance
- cd into project folder
- ```$ npm start run ```
- Select option "1" from the menu to send Ether
- console will return receipt
- you can also see the transaction in your Ganache instance
- to run test: ```npm run test ```

# Accounts
The first two accounts provided by Ganache are used. The private key is imported using the ```.env``` file. In production this should never be visible but here it is included for illustration purposes.

# Gist
Couple of Gist files for fun:
- [send_ether.js](https://gist.github.com/NFhbar/5d658235e3ed19bf1816a8d83853a792)
- [tx_builder.js](https://gist.github.com/NFhbar/f8995f9ca6c9000d127419b77cf73411)

# License
[MIT](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/LICENSE)
