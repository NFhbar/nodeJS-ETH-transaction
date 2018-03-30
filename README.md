# NodeJS Ethereum Transaction
Sends Ether from one account to another using an off-line signing transaction method through [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx).
Currently runs on Ganache but you could easily set it up for your own [geth node](https://github.com/ethereum/go-ethereum/wiki/geth).
Transaction builder with switch cases if you want to add support for other type of transactions.

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

# Accounts
The first two accounts provided by Ganache are used. The private key is imported using the ```.env``` file. In production this should never be visible but here it is included for illustration purposes. 

# License
[MIT](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/LICENSE)
