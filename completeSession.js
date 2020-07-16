'use strict';

const fs = require('fs');
const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
const { uuid } = require('uuidv4');

const AMZNPAY={
  "merchant_id": "A35CJ83E1PPIFM",
  "public_key_id": "AGC4SIRXYYTSA667HVXKNEIA",
  "store_id": "amzn1.application-oa2-client.4493eb1abbc64914a3ab38189d8acef8"
}

const main=async (event)=>{
  const config = {
    publicKeyId: AMZNPAY.public_key_id,
    privateKey: fs.readFileSync('./keys/AmazonPay_AGC4SIRXYYTSA667HVXKNEIA.pem'),
    region: 'eu',
    sandbox: true
  };
  
  const storeClient = new Client.WebStoreClient(config);
  
  
  const headers = {
    'x-amz-pay-idempotency-key': uuid().toString().replace(/-/g, '')
  };
  
  try{
    
    let checkoutSession=await storeClient.getCheckoutSession(event.sessionId, headers)
    let checkoutSessionPayload=JSON.parse(checkoutSession.body)
    
    const finalPayload = {
      chargeAmount: {
        amount: checkoutSessionPayload.paymentDetails.chargeAmount.amount,
        currencyCode: checkoutSessionPayload.paymentDetails.chargeAmount.currencyCode
      }
      
    }
    
    const completedSession = await storeClient.completeCheckoutSession(event.sessionId, finalPayload);
    // let checkoutSessionId=JSON.parse(checkoutSession.body).checkoutSessionId
    // console.log(checkoutSessionId)
    const completedSessionPayload=JSON.parse(completedSession.body)
    console.log(completedSession)
    return { 
      completedSessionPayload:completedSessionPayload
    };
  }
  catch(e){
    console.error(e)
    return { error: 'error getting completedSessionPayload'};
  }
  
}

module.exports.main = main;
