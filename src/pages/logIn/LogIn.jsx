import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { INPUT_NAMES } from '../../constants/libraries';
import styles from './LogIn.module.css';
import { withAuthContext } from '../../HOCs/withAuthContext';
import { emailRegular } from '../../scripts/regulars';
import { ThemeContext } from '../../providers/ThemeProvider';
import { isPasswordValid } from '../../scripts/helpers';
import { ApiAuthContext } from '../../providers/ApiAuthProvider';

function LogIn({ context }) {
  const apiAuthContext = useContext(ApiAuthContext);
  const [state, setState] = useState({
    email: '',
    password: '',
    formErrors: {
      email: '',
      password: '',
    },
    isFirebaseAuth: true,
  });

  const isFormValid = () => {
    const { email, password } = state;
    let formValid = false;
    if (!isPasswordValid(password)) {
      setError(INPUT_NAMES.password, 'Password should contains 8-24 symbols');
    } else {
      formValid = true;
    }

    if (!emailRegular.test(email)) {
      setError(INPUT_NAMES.email, 'Please, use correct email');
      formValid = false;
    }

    return formValid;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { logIn } = context;
    const { email, password } = state;
    if (isFormValid()) {
      let error;
      if (state.isFirebaseAuth) {
        error = await logIn(email, password);
      } else {
        error = await apiAuthContext.logIn(email, password);
      }
      if (error) {
        setError(INPUT_NAMES.password, 'Login or password are incorrect');
      }
    }
  };

  const setError = (name, value) => {
    setState((prevState) => ({ ...prevState, formErrors: { ...prevState.formErrors, [name]: value } }));
  };

  const changeInputValue = ({ target: { name, value } }) => {
    setError(name, '');
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const setFirebaseAuth = () => {
    setState((prevState) => ({ ...prevState, isFirebaseAuth: true }));
  };

  const setSwaggerAuth = () => {
    setState((prevState) => ({ ...prevState, isFirebaseAuth: false }));
  };

  const { email, password, formErrors, isFirebaseAuth } = state;

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={`${styles.login} ${styles[theme]}`}>
          <Form className={`${styles.form} ${styles[theme]}`} onSubmit={submitHandler}>
            <div className={styles.title}>Log In</div>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='text'
                value={email}
                onChange={changeInputValue}
                name={INPUT_NAMES.email}
                placeholder='Enter email'
                isInvalid={formErrors.email}
              />
              <Form.Control.Feedback type='invalid'>{formErrors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={changeInputValue}
                name={INPUT_NAMES.password}
                placeholder='Password'
                isInvalid={formErrors.password}
              />
              <Form.Control.Feedback type='invalid'>{formErrors.password}</Form.Control.Feedback>
            </Form.Group>
            <div className={styles.submit}>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
              <div className={styles.radioGroup} key='inline-radio'>
                <Form.Check
                  inline
                  label='Firebase'
                  type='radio'
                  id='radio-1'
                  onChange={setFirebaseAuth}
                  checked={isFirebaseAuth}
                />
                <Form.Check
                  inline
                  label='Swagger'
                  type='radio'
                  id='radio-2`'
                  onChange={setSwaggerAuth}
                  checked={!isFirebaseAuth}
                />
              </div>
            </div>
          </Form>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

LogIn.propTypes = {
  context: PropTypes.shape({
    logIn: PropTypes.func,
  }).isRequired,
};

export default withAuthContext(LogIn);
