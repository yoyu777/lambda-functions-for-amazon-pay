## Serverless

This example can be deployed automatically using https://www.serverless.com/

## Implementation steps:

1. generate a signature from payload:

  payload => call the getSignature function => signature => render the checkout button with the payload (stringified json) and the signature
  
2. get checkouut session details from session ID (from the redirection url parameter of the checkout review page):
  
  after a user clicks the checkout button, they will be taken to Amazon login page, after clicking "continue", they will be redirected to "checkout review" page
  getting the session ID from the URL parameter => call the getSession function => get a Amazon pay redirection link
  
  if the user clicks the redirection link, checkout is complete
  
3. confirm session details

  You can call the completeSession function and get the transaction status
