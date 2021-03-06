import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { updatePassword } from 'firebase/auth';
import styles from './Settings.module.css';
import {
  ALERT_MODES,
  BUTTON_COLORS,
  BUTTON_VALUES,
  FIELD_NAMES,
  INPUT_NAMES,
  INPUT_TYPES,
  THEMES,
} from '../../constants/libraries';
import Button from '../../components/Buttons/Button/Button';
import { getUserById, updateUser } from '../../scripts/api-service';
import { getChangePasswordErrors, initChangePasswordState } from './settingsHelper';
import { auth } from '../../scripts/firebase-config';
import { ThemeContext } from '../../providers/ThemeProvider';
import { CustomAlert } from '../../components/Alert/Alert';
import { Input } from '../modals/form/ModalFields/Input/Input';

export class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alertMode: '',
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
        this.setState((prevState) => ({ ...prevState, ...initChangePasswordState, alertMode: ALERT_MODES.success }));
      } catch (error) {
        console.log(error);
        this.setState((prevState) => ({ ...prevState, ...initChangePasswordState, alertMode: ALERT_MODES.fail }));
      }
      setTimeout(() => {
        if (this.isComponentMounted) {
          this.setState((prevState) => ({ ...prevState, alertMode: '' }));
        }
      }, 3000);
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
    const { password, newPassword, errors, alertMode } = this.state;

    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div className={`${styles.settings} ${styles[theme]}`}>
            <div className={styles.switchTheme}>
              <div className={styles.title}>Switch theme</div>
              <div className={styles.themeButtons}>
                <Button color={BUTTON_COLORS.orange} onClick={() => toggleTheme(THEMES.light)}>
                  Light
                </Button>
                <Button color={BUTTON_COLORS.blue} onClick={() => toggleTheme(THEMES.dark)}>
                  Dark
                </Button>
              </div>
            </div>

            <div className={styles.changePassword}>
              <div className={styles.title}>Change password</div>
              <div>
                <Input
                  value={password}
                  title={FIELD_NAMES.currentPassword}
                  onChange={this.onChangeInputValue}
                  placeholder={FIELD_NAMES.currentPassword}
                  error={errors.password}
                  type={INPUT_TYPES.password}
                  fieldName={INPUT_NAMES.password}
                />
                <Input
                  value={newPassword}
                  title={FIELD_NAMES.newPassword}
                  onChange={this.onChangeInputValue}
                  type={INPUT_TYPES.password}
                  placeholder={FIELD_NAMES.newPassword}
                  error={errors.newPassword}
                  fieldName={INPUT_NAMES.newPassword}
                />
              </div>
              <Button color={BUTTON_COLORS.green} onClick={this.changePasswordHandler}>
                {BUTTON_VALUES.save}
              </Button>
            </div>
            <CustomAlert
              isActive={alertMode === ALERT_MODES.success}
              variant={ALERT_MODES.success}
              text='Password was changed'
            />
            <CustomAlert
              isActive={alertMode === ALERT_MODES.fail}
              variant={ALERT_MODES.fail}
              text='Fail, try to relogin'
            />
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
