import { PureComponent } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { INPUT_NAMES } from '../../constants/libraries';
import styles from './LogIn.module.css';
import { withAuthContext } from '../../HOCs/withAuthContext';
import { emailRegular } from '../../scripts/regulars';
import { ThemeContext } from '../../providers/ThemeProvider';
import { isPasswordValid } from '../../scripts/helpers';

class LogIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: '',
        password: '',
      },
      isFirebaseAuth: true,
    };
  }

  isFormValid = () => {
    const { email, password } = this.state;
    let formValid = false;
    if (!isPasswordValid(password)) {
      this.setError(INPUT_NAMES.password, 'Password should contains 8-24 symbols');
    } else {
      formValid = true;
    }

    if (!emailRegular.test(email)) {
      this.setError(INPUT_NAMES.email, 'Please, use correct email');
      formValid = false;
    }

    return formValid;
  };

  submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { context } = this.props;
    const { logIn } = context;
    const { email, password } = this.state;
    if (this.isFormValid()) {
      const error = await logIn(email, password);
      if (error) {
        this.setError(INPUT_NAMES.password, 'Login or password are incorrect');
      }
    }
  };

  setError = (name, value) => {
    this.setState((prevState) => ({ ...prevState, formErrors: { ...prevState.formErrors, [name]: value } }));
  };

  changeInputValue = ({ target: { name, value } }) => {
    this.setError(name, '');
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  setFirebaseAuth = () => {
    this.setState((prevState) => ({ ...prevState, isFirebaseAuth: true }));
  };

  setSwaggerAuth = () => {
    this.setState((prevState) => ({ ...prevState, isFirebaseAuth: false }));
  };

  render() {
    const { email, password, formErrors, isFirebaseAuth } = this.state;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`${styles.login} ${styles[theme]}`}>
            <Form className={`${styles.form} ${styles[theme]}`} onSubmit={this.submitHandler}>
              <div className={styles.title}>Log In</div>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='text'
                  value={email}
                  onChange={this.changeInputValue}
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
                  onChange={this.changeInputValue}
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
                    onClick={this.setFirebaseAuth}
                    checked={isFirebaseAuth}
                  />
                  <Form.Check
                    inline
                    label='Swagger'
                    type='radio'
                    id='radio-2`'
                    onClick={this.setSwaggerAuth}
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
}

LogIn.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  context: PropTypes.shape({
    logIn: PropTypes.func,
  }).isRequired,
};

export default withAuthContext(LogIn);
