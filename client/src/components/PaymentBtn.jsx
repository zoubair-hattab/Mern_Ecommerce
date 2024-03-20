import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaymentBtn = (props) => {
  const { product, transSuccess } = props;
  const [error, setError] = useState(null);
  const [paidFor, setPaidFor] = useState(false);
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: product.description,
          amount: {
            value: product.price,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    console.log('order', order);

    handleApprove(order);
  };
  const handleApprove = (order) => {
    console.log(order);
    transSuccess(order);
  };

  const onError = (err) => {
    setError(err);
    console.error('PayPal Checkout onError', err);
  };
  const onCancel = () => {
    console.log('You are cancled the payemnt');
    // Display cancel message, modal or redirect user to cancel page or back to cart
  };

  /* const onClick={(data, actions) => {
    const hasAlreadyBoughtCourse = false;
  
    if (hasAlreadyBoughtCourse) {
      setError(
        "You already bought this course. Go to your account to view your list of courses."
      );
  
      return actions.reject();
    } else {
      return actions.resolve();
    }
  }}*/
  return (
    <PayPalScriptProvider
      options={{
        'client-id': import.meta.env.VITE_CLITE_ID,
      }}
    >
      <PayPalButtons
        style={{
          layout: 'horizontal',
          color: 'gold',
          tagline: false,
          height: 40,

          shape: 'pill',
        }}
        onApprove={onApprove}
        createOrder={createOrder}
        onError={onError}
        onCancel={onCancel}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentBtn;
