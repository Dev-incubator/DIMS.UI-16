import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../../../components/Modal/Modal';
import styles from './UserModal.module.css';
import { BUTTON_COLORS, INPUT_NAMES, INPUT_TYPES, MODAL_VALUES, USER_TITLES } from '../../../constants/libraries';
import { getModalUserData, getUserModalErrors, getUserModalState, userModalState } from './userModalHelpers';
import { FormSubmit } from '../form/formSubmit/FormSubmit';
import { withModalFade } from '../../../HOCs/withModalFade';
import { Input } from '../form/ModalFields/Input/Input';
import { Select } from '../form/ModalFields/Select/Select';

class UserModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = userModalState;
  }

  componentDidMount() {
    const { user, readOnly } = this.props;
    const data = getUserModalState(user, readOnly);
    this.setState(data);
  }

  submitUser = () => {
    const { user, createUser, updateUser } = this.props;
    const errors = getUserModalErrors(this.state);
    if (errors) {
      this.setState({ errors });
    } else {
      const submitUser = getModalUserData(this.state);
      const { setFade } = this.props;
      setFade();
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
    this.setState((prevState) => ({ ...prevState, errors: { ...prevState.errors, [name]: '' } }));
  };

  render() {
    const { onClose, active, user } = this.props;
    const {
      title,
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
      errors,
      readOnly,
    } = this.state;

    return (
      <Modal onClose={onClose} active={active}>
        <div className={styles.title}>{title}</div>
        <div className={styles.form}>
          <Input
            value={name}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.name}
            error={errors.name}
            readOnly={readOnly}
            title={MODAL_VALUES.name}
            type={INPUT_TYPES.text}
            placeholder={MODAL_VALUES.name}
          />
          <Input
            value={surname}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.surname}
            error={errors.surname}
            readOnly={readOnly}
            title={MODAL_VALUES.surname}
            type={INPUT_TYPES.text}
            placeholder={MODAL_VALUES.surname}
          />
          <Input
            value={email}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.email}
            error={errors.email}
            readOnly={!!user}
            title={MODAL_VALUES.email}
            type={INPUT_TYPES.text}
            placeholder={MODAL_VALUES.email}
          />
          <Select
            value={direction}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.direction}
            error={errors.direction}
            readOnly={readOnly}
            title={MODAL_VALUES.direction}
            items={['Java', '.Net', 'Frontend', 'Data Science']}
            defaultValue={MODAL_VALUES.direction}
          />
          <Select
            value={sex}
            onChange={this.onChangeInputValue}
            defaultValue={MODAL_VALUES.sex}
            fieldName={INPUT_NAMES.sex}
            title={MODAL_VALUES.sex}
            items={['Male', 'Female', 'Undefined']}
            readOnly={readOnly}
            error={errors.sex}
          />
          <Select
            value={role}
            onChange={this.onChangeInputValue}
            defaultValue={MODAL_VALUES.role}
            fieldName={INPUT_NAMES.role}
            title={MODAL_VALUES.role}
            items={['Admin', 'Mentor', 'User']}
            readOnly={readOnly}
            error={errors.role}
          />
          {!user && (
            <div>
              <Input
                value={password}
                onChange={this.onChangeInputValue}
                fieldName={INPUT_NAMES.password}
                error={errors.password}
                readOnly={readOnly}
                title={MODAL_VALUES.password}
                type={INPUT_TYPES.password}
                placeholder={MODAL_VALUES.password}
              />
              <Input
                value={confirmPassword}
                onChange={this.onChangeInputValue}
                fieldName={INPUT_NAMES.confirmPassword}
                error={errors.confirmPassword}
                readOnly={readOnly}
                title={MODAL_VALUES.confirmPassword}
                type={INPUT_TYPES.password}
                placeholder={MODAL_VALUES.confirmPassword}
              />
            </div>
          )}
          <Input
            value={birthDate}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.birthDate}
            error={errors.birthDate}
            readOnly={readOnly}
            title={MODAL_VALUES.birthDate}
            type={INPUT_TYPES.date}
            placeholder={MODAL_VALUES.birthDate}
          />
          <Input
            value={address}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.address}
            error={errors.address}
            readOnly={readOnly}
            title={MODAL_VALUES.address}
            type={INPUT_TYPES.text}
            placeholder={MODAL_VALUES.address}
          />
          <Input
            value={phone}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.phone}
            error={errors.phone}
            readOnly={readOnly}
            title={MODAL_VALUES.phone}
            type={INPUT_TYPES.text}
            placeholder={MODAL_VALUES.phone}
          />
          <Input
            value={skype}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.skype}
            error={errors.skype}
            readOnly={readOnly}
            title={MODAL_VALUES.skype}
            type={INPUT_TYPES.text}
            placeholder={MODAL_VALUES.skype}
          />
          <Input
            value={startDate}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.startDate}
            error={errors.startDate}
            readOnly={readOnly}
            title={MODAL_VALUES.startDate}
            type={INPUT_TYPES.date}
            placeholder={MODAL_VALUES.startDate}
          />
          <Input
            value={education}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.education}
            error={errors.education}
            readOnly={readOnly}
            title={MODAL_VALUES.education}
            type={INPUT_TYPES.text}
            placeholder={MODAL_VALUES.education}
          />
          <Input
            value={averageScore}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.averageScore}
            error={errors.averageScore}
            readOnly={readOnly}
            title={MODAL_VALUES.averageScore}
            type={INPUT_TYPES.text}
            placeholder={MODAL_VALUES.averageScore}
          />
          <Input
            value={mathScore}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.mathScore}
            error={errors.mathScore}
            readOnly={readOnly}
            title={MODAL_VALUES.mathScore}
            type={INPUT_TYPES.text}
            placeholder={MODAL_VALUES.mathScore}
          />
        </div>
        <FormSubmit
          onClose={onClose}
          onSubmit={this.submitUser}
          submitButtonColor={title === USER_TITLES.edit ? BUTTON_COLORS.green : BUTTON_COLORS.blue}
          readOnly={readOnly}
        />
      </Modal>
    );
  }
}

UserModal.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setFade: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string),
  updateUser: PropTypes.func.isRequired,
};

UserModal.defaultProps = {
  user: null,
};

export default withModalFade(UserModal);
