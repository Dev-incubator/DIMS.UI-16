import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { updatePassword } from 'firebase/auth';
import { Alert } from 'react-bootstrap';
import styles from './Settings.module.css';
import { FormField } from '../modals/form/formField/FormField';
import { BUTTON_COLORS, BUTTON_VALUES, FIELD_NAMES, INPUT_NAMES, INPUT_TYPES } from '../../scripts/libraries';
import { Button } from '../../components/Buttons/Button/Button';
import { getUserById, updateUser } from '../../scripts/api-service';
import { getChangePasswordErrors, initChangePasswordState } from './settingsHelper';
import { auth } from '../../scripts/firebase-config';
import { ThemeContext } from '../../providers/ThemeProvider';

export class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      ...initChangePasswordState,
    };
    this.isComponentMounted = false;
  }

  componentDidMount() {
    this.isComponentMounted = true;
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  changePasswordHandler = async () => {
    const { match } = this.props;
    const { newPassword } = this.state;
    const { id } = match.params;
    const user = await getUserById(id);
    const errors = getChangePasswordErrors(user, this.state);

    if (errors) {
      this.setState({ errors });
    } else {
      try {
        await updatePassword(auth.currentUser, newPassword);
        await updateUser(user.id, { password: newPassword, confirmPassword: newPassword });
        this.setState((prevState) => ({ ...prevState, ...initChangePasswordState, showAlert: true }));
        setTimeout(() => {
          if (this.isComponentMounted) {
            this.setState((prevState) => ({ ...prevState, showAlert: false }));
          }
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  onChangeInputValue = (name, value) => {
    this.resetFieldError(name);
    this.setState({ [name]: value });
  };

  resetFieldError = (name) => {
    this.setState((prevState) => ({ ...prevState, errors: { ...prevState.errors, [name]: '' } }));
  };

  render() {
    const { password, newPassword, errors, showAlert } = this.state;

    return (
      <ThemeContext.Consumer>
        {({ theme, changeTheme }) => (
          <div className={styles.settings} style={{ borderColor: theme.borderColor }}>
            <div>
              <div className={styles.title}>Switch theme</div>
              <div>
                <button type='button' onClick={() => changeTheme('light')}>
                  Light
                </button>
                <button type='button' onClick={() => changeTheme('dark')}>
                  Dark
                </button>
              </div>
            </div>

            <div className={styles.changePassword}>
              <div className={styles.title}>Change password</div>
              <div>
                <FormField
                  fieldName={FIELD_NAMES.pastPassword}
                  inputValue={password}
                  inputName={INPUT_NAMES.password}
                  error={errors.password}
                  onChange={this.onChangeInputValue}
                  stylingType={INPUT_TYPES.password}
                />
                <FormField
                  fieldName={FIELD_NAMES.newPassword}
                  inputValue={newPassword}
                  inputName={INPUT_NAMES.newPassword}
                  error={errors.newPassword}
                  onChange={this.onChangeInputValue}
                  stylingType={INPUT_TYPES.password}
                />
              </div>
              <Button color={BUTTON_COLORS.green} onClick={this.changePasswordHandler}>
                {BUTTON_VALUES.save}
              </Button>
            </div>
            <Alert className={showAlert ? `${styles.alert} ${styles.active}` : styles.alert} show variant='success'>
              <div>Password was changed</div>
            </Alert>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

Settings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
