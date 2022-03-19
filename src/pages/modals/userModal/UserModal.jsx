import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { deepEqual } from '../../../scripts/helpers';
import { Modal } from '../../../components/Modal/Modal';
import styles from './UserModal.module.css';
import { FormField } from '../form/formField/FormField';
import {
  BUTTON_COLORS,
  INPUT_NAMES,
  INPUT_TYPES,
  MODAL_VALUES,
  USER_MODAL_TITLES,
  USER_ROLES,
} from '../../../scripts/libraries';
import {
  getCreateUserModalState,
  getEditUserModalState,
  getModalUserData,
  getReadUserModalState,
  getUserModalErrors,
  initStartUserModalState,
} from './userModalHelpers';
import { FormSubmit } from '../form/formSubmit/FormSubmit';

export class UserModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initStartUserModalState;
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props;
    if (!deepEqual(prevProps, this.props) && active) {
      const { user, readOnly } = this.props;
      if (readOnly && user) {
        this.setReadData();
      } else if (user) {
        this.setEditData();
      } else {
        this.setCreateData();
      }
    }
  }

  setReadData = () => {
    const { user } = this.props;
    const data = getReadUserModalState(user);
    this.setState(data);
  };

  setEditData = () => {
    const { user } = this.props;
    const data = getEditUserModalState(user);
    this.setState(data);
  };

  setCreateData = () => {
    const data = getCreateUserModalState();
    this.setState(data);
  };

  submitUser = () => {
    const { user, createUser, updateUser } = this.props;
    const formErrors = getUserModalErrors(this.state);
    if (formErrors) {
      this.setState({ formErrors });
    } else {
      const submitUser = getModalUserData(this.state);
      if (user) {
        updateUser(submitUser);
      } else {
        createUser(submitUser);
      }
    }
  };

  onChangeInputValue = (name, value) => {
    this.resetFieldError(name);
    this.setState({ [name]: value });
  };

  resetFieldError = (name) => {
    this.setState((prevState) => ({ ...prevState, formErrors: { ...prevState.formErrors, [name]: '' } }));
  };

  render() {
    const { disableModalMode, active, user } = this.props;
    const {
      modalTitle,
      name,
      surname,
      email,
      direction,
      sex,
      role,
      password,
      confirmPassword,
      birthDate,
      address,
      phone,
      skype,
      startDate,
      education,
      averageScore,
      mathScore,
      formErrors,
      readOnly,
    } = this.state;

    return (
      <Modal disableModalMode={disableModalMode} active={active}>
        <div className={styles.title}>{modalTitle}</div>
        <div className={styles.form}>
          <FormField
            inputValue={name}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.name}
            error={formErrors.name}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.name}
            stylingType={INPUT_TYPES.text}
          />
          <FormField
            inputValue={surname}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.surname}
            error={formErrors.surname}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.surname}
          />
          <FormField
            inputValue={email}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.email}
            error={formErrors.email}
            readOnly={!!user}
            fieldName={MODAL_VALUES.email}
          />
          <FormField
            inputValue={direction}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.direction}
            error={formErrors.direction}
            readOnly={readOnly}
            selectValues={['Java', '.Net', 'Frontend', 'Data Science']}
            fieldName={MODAL_VALUES.direction}
          />
          <FormField
            inputValue={sex}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.sex}
            error={formErrors.sex}
            readOnly={readOnly}
            selectValues={['Male', 'Female', 'Undefined']}
            fieldName={MODAL_VALUES.sex}
          />
          <FormField
            inputValue={role}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.role}
            error={formErrors.role}
            readOnly={readOnly}
            selectValues={[USER_ROLES.admin, USER_ROLES.mentor, USER_ROLES.user]}
            fieldName={MODAL_VALUES.role}
          />
          {!user && (
            <div>
              <FormField
                inputValue={password}
                onChange={this.onChangeInputValue}
                inputName={INPUT_NAMES.password}
                error={formErrors.password}
                readOnly={readOnly}
                stylingType={INPUT_TYPES.password}
                fieldName={MODAL_VALUES.password}
              />
              <FormField
                inputValue={confirmPassword}
                onChange={this.onChangeInputValue}
                inputName={INPUT_NAMES.confirmPassword}
                error={formErrors.confirmPassword}
                readOnly={readOnly}
                stylingType={INPUT_TYPES.password}
                fieldName={MODAL_VALUES.confirmPassword}
              />
            </div>
          )}
          <FormField
            inputValue={birthDate}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.birthDate}
            error={formErrors.birthDate}
            stylingType={INPUT_TYPES.date}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.birthDate}
          />
          <FormField
            inputValue={address}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.address}
            error={formErrors.address}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.address}
          />
          <FormField
            inputValue={phone}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.phone}
            error={formErrors.phone}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.phone}
          />
          <FormField
            inputValue={skype}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.skype}
            error={formErrors.skype}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.skype}
          />
          <FormField
            inputValue={startDate}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.startDate}
            error={formErrors.startDate}
            stylingType={INPUT_TYPES.date}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.startDate}
          />
          <FormField
            inputValue={education}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.education}
            error={formErrors.education}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.education}
          />
          <FormField
            inputValue={averageScore}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.averageScore}
            error={formErrors.averageScore}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.averageScore}
          />
          <FormField
            inputValue={mathScore}
            onChange={this.onChangeInputValue}
            inputName={INPUT_NAMES.mathScore}
            error={formErrors.mathScore}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.mathScore}
          />
        </div>
        <FormSubmit
          disableModalMode={disableModalMode}
          onSubmit={this.submitUser}
          submitButtonColor={modalTitle === USER_MODAL_TITLES.edit ? BUTTON_COLORS.green : BUTTON_COLORS.blue}
          readOnly={readOnly}
        />
      </Modal>
    );
  }
}

UserModal.propTypes = {
  active: PropTypes.bool.isRequired,
  disableModalMode: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string),
  updateUser: PropTypes.func.isRequired,
};

UserModal.defaultProps = {
  user: null,
};
