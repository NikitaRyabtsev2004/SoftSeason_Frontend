import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            console.log('PaymentMethod:', paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <div className='payButton'>
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
