//Menu
import menu from 'node-menu'
import Header from './menu/header.js'
//Functions
import sendEther from './functions/send_ether.js'

menu.addDelimiter('-', 40, '')

    .addItem('Send Ether', sendEther)
    .addDelimiter('*', 40)
    .customHeader(Header)
    .disableDefaultHeader()
    .customPrompt(function() {
        process.stdout.write('\nEnter selection:\n')
    })
    .disableDefaultPrompt()

    .start()
