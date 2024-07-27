import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../components/SectionTitle';
import CheckoutForm from './CheckoutForm';

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
  return (
    <div>
      <SectionTitle
        heading="Payment"
        subHeading="Please pay to Read"
      ></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
