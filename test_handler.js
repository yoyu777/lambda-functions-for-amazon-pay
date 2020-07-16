const fs = require('fs');
const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
const { uuid } = require('uuidv4');

const getSignature=require('./getSignature.js')
const getSession=require('./getSession.js')
const completeSession=require('./completeSession.js')

console.log(process.cwd())

const run=async ()=>{
    try{
        console.log(await getSignature.main({
        }))

        // console.log(await getSession.main({
        //     sessionId:'0b756bbf-49a0-4a5e-8f2c-e79ac4c50f54'
        // }))

        // console.log(await completeSession.main({
        //     sessionId:'1f324717-9806-48c1-88e4-6525c22e6c06'
        // }))

    }catch(e){
        console.error(e)
    }

  
}
run()