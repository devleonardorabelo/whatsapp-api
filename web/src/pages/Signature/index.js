import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import { BodyRow, Main, Container1, Container2, Grow1, Box, InputTextNmf, Column, RowEnd, ButtonAction, Button, Row } from '../../components/StyledComponents'

import axios from "axios";

import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {

  const [sent, setSent] = useState(false)

  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory()

  const handleSubmit = async event => {
    event.preventDefault();

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    try {
      
      const response = await axios.post(`${process.env.REACT_APP_BACK_DOMAIN}/payment`, {
          email: 'leonardomrabelo@live.com',
          payment_method: result.paymentMethod.id
      },
          { headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` } }
      );
      if(response.data.paid == true){
        return history.push('/panel')
      }

    } catch (error) {
        console.log(error);
    }
    
  };

  return (
    
    <BodyRow>
      <Nav />
      <Main>
        <Title title1='Comprar' title2='Licensa' />
        <Column>
          <Column>
            <form onSubmit={handleSubmit}>
              <Container2>
                <Box>
                    <Grow1><CardElement/></Grow1>
                </Box>  
              </Container2>
              <Container2>
                <InputTextNmf />
              </Container2>
              
            </form>
          </Column>
          <Container1>
            <RowEnd>
              <ButtonAction type="submit" disabled={!stripe || sent} onClick={setSent}>Pay</ButtonAction>  
            </RowEnd>
          </Container1>
        </Column>
        
      </Main>
    </BodyRow>

  );
};

const stripePromise = loadStripe('pk_test_pPOC14ljvMHYJOODJ7mOXtJe00Pter1jsE');

const Signature = () => {

  return (
    <Elements stripe={stripePromise} >
      <CheckoutForm />
    </Elements>
  );
};

export default Signature;