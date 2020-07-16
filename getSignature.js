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
  
  const signingClient = new Client.AmazonPayClient(config);
  const payload = {
    webCheckoutDetails: {
      checkoutReviewReturnUrl: 'https://peoplemove.infinite-y.com/checkout_review.html'
    },
    storeId: AMZNPAY.store_id,
    paymentDetails:{
      paymentIntent:'AuthorizeWithCapture',
      chargeAmount:{
        amount:'5',
        currencyCode:'GBP'
      },
      softDescriptor:'PeopleMoveThanks'
    }
  };
  
  const headers = {
    'x-amz-pay-idempotency-key': uuid().toString().replace(/-/g, '')
  };
  
  try{
    const signature = signingClient.generateButtonSignature(payload);
    console.log(signature)
    return { 
      checkoutPayload:payload,
      signature:signature
    };
  }
  catch(e){
    console.error(e)
    return { error: 'error getting checkoutSessionId'};
  }
  
}

module.exports.main = main;
