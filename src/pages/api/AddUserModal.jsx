import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { withModalFade } from '../../HOCs/withModalFade';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../modals/form/ModalFields/Input/Input';
import { FormSubmit } from '../modals/form/formSubmit/FormSubmit';
import { BUTTON_COLORS, INPUT_TYPES } from '../../constants/libraries';
import { getDirections } from './api';
import { Select } from '../modals/form/ModalFields/Select/Select';
import { Loading } from '../loading/Loading';

const fields = {
  firstName: '',
  lastName: '',
  email: '',
  directionName: '',
  sex: '',
  roles: '',
  password: '',
  repeatPassword: '',
  birthDate: '',
  address: '',
  mobilePhone: '',
  skype: '',
  startDate: '',
  education: '',
  universityAverageScore: '',
  mathScore: '',
};

const fieldKeys = Object.keys(fields);
const dateFields = ['birthDate', 'startDate'];
const passwordFields = ['password', 'repeatPassword'];
const selectFields = ['roles', 'sex', 'directionName'];

const getInputType = (fieldName) => {
  if (dateFields.some((el) => el === fieldName)) {
    return INPUT_TYPES.date;
  }
  if (passwordFields.some((el) => el === fieldName)) {
    return INPUT_TYPES.password;
  }

  return INPUT_TYPES.text;
};

const AddUserModal = ({ active, onClose, addUser, setFade }) => {
  const [selectValues, setSelectValues] = useState({
    sex: ['Male', 'Female'],
    roles: ['Admin', 'Mentor', 'User'],
    directionName: [],
  });
  useEffect(() => {
    (async () => {
      const directionName = await getDirections();
      setSelectValues((prevState) => ({ ...prevState, directionName }));
    })();
  }, []);
  const [inputValues, setInputValues] = useState({ ...fields });

  const onSubmit = () => {
    console.log(inputValues);
    addUser(inputValues);
    setFade();
  };

  const onInputChange = (name, value) => {
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  if (!selectValues.directionName.length) {
    return <Loading />;
  }

  return (
    <Modal active={active} onClose={onClose}>
      <div>
        {fieldKeys.map((key, index) => {
          if (selectFields.some((el) => el === key)) {
            return (
              <Select
                key={`${key}${index.toString()}`}
                value={inputValues[key]}
                defaultValue={`Choose ${key}`}
                title={key}
                items={selectValues[key]}
                fieldName={key}
                onChange={onInputChange}
              />
            );
          }

          return (
            <Input
              key={`${key}${index.toString()}`}
              value={inputValues[key]}
              title={key}
              onChange={onInputChange}
              fieldName={key}
              type={getInputType(key)}
              autoComplete='off'
            />
          );
        })}
      </div>
      <FormSubmit
        onClose={onClose}
        onSubmit={onSubmit}
        submitButtonColor={BUTTON_COLORS.blue}
        submitButtonValue='Add user'
        backButtonValue='Go back'
      />
    </Modal>
  );
};

AddUserModal.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setFade: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
};

export default withModalFade(AddUserModal);
