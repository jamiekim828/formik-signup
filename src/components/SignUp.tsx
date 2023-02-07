import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  lastName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your last name'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password does not match')
    .required('Password confirmation is required'),
});

export default function SignUp() {
  return (
    <div className='signup-div'>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched, handleChange }) => (
          <Form className='signup'>
            <TextField
              id='filled-basic'
              label='First Name'
              variant='filled'
              name='firstName'
              onChange={handleChange}
            />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}

            <TextField
              id='filled-basic'
              label='Last Name'
              variant='filled'
              name='lastName'
              onChange={handleChange}
            />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}

            <TextField
              id='filled-basic'
              label='E-mail'
              variant='filled'
              name='email'
              onChange={handleChange}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <TextField
              id='filled-basic'
              label='Password'
              variant='filled'
              name='password'
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <TextField
              id='filled-basic'
              label='Password Confirmation'
              variant='filled'
              name='confirmPassword'
              onChange={handleChange}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}

            <button type='submit' className='submit'>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
