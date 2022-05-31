const { PaymentGateway } = require('@cashfreepayments/cashfree-sdk');

// Instantiate Cashfree Payment Gateway
export const pg = new PaymentGateway({
  env: 'TEST',
  apiVersion: '1.0.0',
  appId: '',
  secretKey: '',
});