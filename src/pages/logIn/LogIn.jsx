import { PureComponent } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { INPUT_NAMES } from '../../constants/libraries';
import styles from './LogIn.module.css';
import { emailRegular } from '../../scripts/regulars';
import { AuthContext } from '../../providers/AuthProvider';

export class LogIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: '',
        password: '',
      },
    };
  }

  isFormValid = () => {
    const { email, password } = this.state;
    let formValid = false;
    if (password.length < 8) {
      this.setError(INPUT_NAMES.password, 'Password should contains 8 or more symbols');
    } else if (password.length > 24) {
      this.setError(INPUT_NAMES.password, 'Password is too long');
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
    const { context } = this;
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

  render() {
    const { email, password, formErrors } = this.state;

    return (
      <div className={styles.login}>
        <Form className={styles.form} onSubmit={this.submitHandler}>
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

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

LogIn.contextType = AuthContext;

LogIn.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
