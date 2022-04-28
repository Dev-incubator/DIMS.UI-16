import PropTypes from 'prop-types';
import { useState } from 'react';
import { withModalFade } from '../../HOCs/withModalFade';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../modals/form/ModalFields/Input/Input';
import { FormSubmit } from '../modals/form/formSubmit/FormSubmit';
import { BUTTON_COLORS, INPUT_TYPES } from '../../constants/libraries';
import { Error } from '../../components/Error/Error';

const INPUT_NAMES = {
  login: 'login',
  password: 'password',
};

const LoginModal = ({ active, onClose, logIn, error }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    logIn(login, password);
  };

  const onInputChange = (name, value) => {
    if (name === INPUT_NAMES.login) {
      setLogin(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <Modal active={active} onClose={onClose}>
      <h2>Login</h2>
      <div>
        <Input
          value={login}
          title='Login'
          fieldName={INPUT_NAMES.login}
          onChange={onInputChange}
          autoComplete='off'
          placeholder='Type login'
        />
        <Input
          value={password}
          title='Password'
          type={INPUT_TYPES.password}
          fieldName={INPUT_NAMES.password}
          autoComplete='off'
          onChange={onInputChange}
          placeholder='Type password'
        />
      </div>
      {error && <Error message={error} />}
      <FormSubmit
        onClose={onClose}
        onSubmit={onSubmit}
        submitButtonColor={BUTTON_COLORS.blue}
        submitButtonValue='Log in'
        backButtonValue='Cancel'
      />
    </Modal>
  );
};

LoginModal.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default withModalFade(LoginModal);
