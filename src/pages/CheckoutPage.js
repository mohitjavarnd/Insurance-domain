import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, updateDoc , getDoc} from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


const CheckoutSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Invalid card number must be of exact 16 digit')
    .required('Card number is required'),
  cardName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Invalid card holder name')
    .required('Card holder name is required'),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date. Format: MM/YY')
    .required('Expiry date is required'),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, 'Invalid CVV. Must be 3 or 4 digits')
    .required('CVV is required')
});


function CheckoutPage() {
  const user = auth.currentUser;
  const { policyId } = useParams();
  const policies = useSelector((state) => state.policies.policies);
  const selectedPolicy = policies.find(policy => policy.id === policyId);
  const navigate = useNavigate(); 

  const handlePaymentSubmit = async (values) => {
    if (user) {
      const uid = user.uid;
      const userRef = doc(db, 'users', uid);

      try {
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();

        const updatedPolicies = [...userData.policyBrought, policyId];

        await updateDoc(userRef, { policyBrought: updatedPolicies });

        console.log('Policy added ');
     toast.success("You are subscribe to the policy");   
        navigate('/ProfileInfo');

      } catch (error) {
        console.error('Error :', error);
        toast.error("Can't process the transition please fill all the fields");
      }
    } else {
      console.error('No user is currently logged in');
    }
  };

  return (
   <div className="container mt-5">
  <div className="row g-3">
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title green heading">{selectedPolicy?.coverageName}</h2>
          <p className="card-text">Type: {selectedPolicy?.type}</p>
          <p className="card-text">Category: {selectedPolicy?.category}</p>
          <p className="card-text">Price: {selectedPolicy?.price}</p>
          <p className="card-text">coverage: {selectedPolicy?.coverage}L</p>
        </div>
      </div>
    </div>
  


    <div className="col-md-6 card p-4">
      <h2 className='green fw-bold'>Payment Details</h2>
      <Formik
        initialValues={{
          cardNumber: '',
          cardName: '',
          expiryDate: '',
          cvv: ''
        }}
        validationSchema={CheckoutSchema}
        onSubmit={handlePaymentSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <Field
                type="text"
                className={`form-control ${errors.cardNumber && touched.cardNumber ? 'is-invalid' : ''}`}
                name="cardNumber"
              />
              <ErrorMessage name="cardNumber" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Card Holder Name</label>
              <Field
                type="text"
                className={`form-control ${errors.cardName && touched.cardName ? 'is-invalid' : ''}`}
                name="cardName"
              />
              <ErrorMessage name="cardName" component="div" className="text-danger" />
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Expiry Date</label>
                <Field
                  type="text"
                  className={`form-control ${errors.expiryDate && touched.expiryDate ? 'is-invalid' : ''}`}
                  name="expiryDate"
                />
                <ErrorMessage name="expiryDate" component="div" className="text-danger" />
              </div>
              <div className="col-md-6">
                <label className="form-label">CVV</label>
                <Field
                  type="text"
                  className={`form-control ${errors.cvv && touched.cvv ? 'is-invalid' : ''}`}
                  name="cvv"
                />
                <ErrorMessage name="cvv" component="div" className="text-danger" />
              </div>
            </div>
            <button type="submit" className="btn btn-outline-success rounded-0  mt-3">Submit Payment</button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
</div>

  );
}

export default CheckoutPage;
