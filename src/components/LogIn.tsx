import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextField } from '@mui/material';
import { Button, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LogInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      'Password should contain uppercase letter, lowercase letter and number'
    ),
});

type Prop = {
  email: string;
};

type LogInInfo = {
  email: string;
  password: string;
};

export default function LogIn({ email }: Prop) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [userName, setUserName] = useState('');
  const [welcome, setWelcome] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '');
  console.log(user);

  const handleLogIn = (loginInfo: LogInInfo) => {
    if (loginInfo.email === user.email) {
      if (loginInfo.password === user.password) {
        setUserName(user.firstName);
        setWelcome(true);
      } else {
        alert('wrong password');
      }
    } else {
      alert('Please sign up first');
    }
  };

  return (
    <div>
      {welcome === false && (
        <div className='signup-div'>
          <h1>Log In</h1>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={LogInSchema}
            onSubmit={(values) => {
              handleLogIn(values);
            }}
          >
            {({ errors, touched, handleChange }) => (
              <Form className='signup'>
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
      {welcome === true && (
        <div className='signup-div'>
          <h1>Welcome {userName}!</h1>
        </div>
      )}
    </div>
  );
}
