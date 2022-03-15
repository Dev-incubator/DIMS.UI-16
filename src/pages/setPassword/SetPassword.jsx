import { PureComponent } from 'react';
import { signOut, updatePassword } from 'firebase/auth';
import PropTypes from 'prop-types';
import { auth } from '../../scripts/firebase-config';
import { getUid } from '../../scripts/helpers';
import { getUserById, login, updateUser } from '../../scripts/api-service';
import styles from './SetPassword.module.css';
import { BUTTON_COLORS, BUTTON_VALUES, INPUT_TYPES } from '../../scripts/libraries';
import { Button } from '../../components/Buttons/Button/Button';
import { encryptId } from '../../scripts/crypt';

export class SetPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      password: '',
      error: false,
    };
  }

  async componentDidMount() {
    const cryptedId = getUid(document.location.search);
    const id = encryptId(cryptedId);
    const user = await getUserById(id);
    await login(user.email, user.password);
    this.setState({ user });
  }

  async componentWillUnmount() {
    const { history } = this.props;
    await signOut(auth);
    history.push('/login');
  }

  changePasswordValue = (event) => {
    this.setState({ password: event.currentTarget.value, error: false });
  };

  setPassword = async () => {
    const { password, user } = this.state;
    const { history } = this.props;
    if (password.length < 8 || password.length > 24) {
      this.setState({ error: true });
    } else {
      try {
        await updateUser(user.id, { password });
        await updatePassword(auth.currentUser, password);
        alert('Success password set');
        history.push('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { user, password, error } = this.state;
    if (!user) {
      return <div className={styles.wrapper}>Loading...</div>;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>Set your own password</div>
          <div className={styles.inputs}>
            <input type={INPUT_TYPES.text} value={user.email} disabled />
            <input
              type={INPUT_TYPES.password}
              value={password}
              placeholder='Password'
              onChange={this.changePasswordValue}
            />
            {error && <div className={styles.error}>Password should contains 8-24 symbols</div>}
          </div>
          <div className={styles.submit}>
            <Button color={BUTTON_COLORS.green} onClick={this.setPassword}>
              {BUTTON_VALUES.save}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

SetPassword.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
