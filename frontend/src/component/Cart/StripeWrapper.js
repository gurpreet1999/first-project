import React from 'react'
import Payment from './Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const StripeWrapper = (stripeApiKey) => {
  console.log(stripeApiKey)
  return (
    <Elements stripe={loadStripe(stripeApiKey.stripeApiKey)}>
    <Payment  />
  </Elements>
  )
}

export default StripeWrapper