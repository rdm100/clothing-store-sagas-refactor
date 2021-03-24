import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51ILxVIF1MbtiV2FGx2JXKXtRE455y2FXPVJVzHN9fJlmm7fG2aET4Fg3upOaHRy7tUMd0MUpAurG4mwLOnyuMXAk00snCQAOcE';

  const onToken = (token) => {
    axios({ 
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
     }).then(response => {
       alert('Payment successful');
     }).catch(error => {
       console.log('Payment error: ', error);
       alert('There was an issue with your payment. Please ensure you use the provided test credit card.');
     });
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='Clothing store'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is £${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;