import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';x
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  profession: Yup.string(),
  birthDate: Yup.date().max(new Date(), "Birth date must be in the past"),
});

function EditProfile() {
  const user = auth.currentUser;
  const userEmail = user ? user.email : '';
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, 'users', uid);
  
      try {
        // Get the existing user data
        const userSnapshot = await getDoc(userDocRef);
        const existingUserData = userSnapshot.data() || {};
  
        // Ensure policyBrought and claim fields are initialized as arrays
        const updatedValues = {
          ...values,
          policyBrought: existingUserData.policyBrought || [],
          claim: existingUserData.claim || [],
          compare: existingUserData.compare || [],
        };
  
        await setDoc(userDocRef, updatedValues, { merge: true });
  
        toast.success('Profile data saved successfully');
        navigate('/ProfileInfo');
      } catch (error) {
        toast.error('Error saving profile data');
      }
    } else {
      console.error('No user is currently logged in');
    }
  
    setSubmitting(false);
  };
  
  

  return (
    <div className="container mt-5 card p-4 ">
      <h1 className='green fw-bold '>Edit Profile</h1>
      <Formik
        initialValues={{
          name: '',
          profession: '',
          birthDate: '',
          email: userEmail,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className=''>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="error text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <Field type="email" name="email" className="form-control" disabled />
              <ErrorMessage name="email" component="div" className="error text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="profession" className="form-label">Profession:</label>
              <Field type="text" name="profession" className="form-control" />
              <ErrorMessage name="profession" component="div" className="error text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">Birth Date:</label>
              <Field type="date" name="birthDate" className="form-control" />
              <ErrorMessage name="birthDate" component="div" className="error text-danger" />
            </div>
            <button type="submit" className="btn btn-outline-success rounded-0 " disabled={isSubmitting}>
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditProfile;
