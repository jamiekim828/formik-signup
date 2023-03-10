import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from '@mui/material/TextField';
import { Button, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LogIn from './LogIn';

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
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      'Password should contain uppercase letter, lowercase letter and number'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password does not match')
    .required('Password confirmation is required'),
});

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');

  const submitHandler = (user: User) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setLogin(true);
      setEmail(user.email);
    }
    if (!user) {
      setLogin(false);
    }
  };

  return (
    <div>
      {login === false && (
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
              submitHandler(values);
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
                  <p>{errors.firstName}</p>
                ) : null}

                <TextField
                  id='filled-basic'
                  label='Last Name'
                  variant='filled'
                  name='lastName'
                  onChange={handleChange}
                />
                {errors.lastName && touched.lastName ? (
                  <p>{errors.lastName}</p>
                ) : null}

                <TextField
                  id='filled-basic'
                  label='E-mail'
                  variant='filled'
                  name='email'
                  onChange={handleChange}
                />
                {errors.email && touched.email ? <p>{errors.email}</p> : null}

                <TextField
                  id='filled-basic'
                  label='Password'
                  variant='filled'
                  name='password'
                  type={passwordVisibility ? 'text' : 'password'}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {passwordVisibility ? (
                          <VisibilityIcon
                            onClick={() => setPasswordVisibility(false)}
                          />
                        ) : (
                          <VisibilityOffIcon
                            onClick={() => setPasswordVisibility(true)}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : null}

                <TextField
                  id='filled-basic'
                  label='Password Confirmation'
                  variant='filled'
                  name='confirmPassword'
                  type={passwordVisibility ? 'text' : 'password'}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {passwordVisibility ? (
                          <VisibilityIcon
                            onClick={() => setPasswordVisibility(false)}
                          />
                        ) : (
                          <VisibilityOffIcon
                            onClick={() => setPasswordVisibility(true)}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />

                {errors.confirmPassword && touched.confirmPassword ? (
                  <p>{errors.confirmPassword}</p>
                ) : null}

                <div className='submit'>
                  <Button
                    type='submit'
                    color='secondary'
                    sx={{
                      marginTop: '20px',
                      fontWeight: '800',
                      fontSize: '22px',
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {login === true && <LogIn email={email} />}
    </div>
  );
}
