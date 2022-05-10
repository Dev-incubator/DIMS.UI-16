import PropTypes from 'prop-types';
import { useState } from 'react';
import { withModalFade } from '../../HOCs/withModalFade';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../modals/form/ModalFields/Input/Input';
import { FormSubmit } from '../modals/form/formSubmit/FormSubmit';
import { BUTTON_COLORS } from '../../constants/libraries';

const UniversalModal = ({ active, onClose, onSubmit, formValues, title, setFade }) => {
  const [inputValues, setInputValues] = useState(formValues);
  const onSubmitHandler = () => {
    onSubmit(inputValues);
    setFade();
  };

  const onChangeInputValue = (name, value) => {
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Modal active={active} onClose={onClose}>
      <h2>{title}</h2>
      {Object.keys(formValues).map((item, index) => (
        <Input
          key={`${item}${index.toString()}`}
          value={inputValues[item]}
          title={item}
          onChange={onChangeInputValue}
          fieldName={item}
          autoComplete='off'
          placeholder={`Type ${item}`}
        />
      ))}
      <FormSubmit onClose={onClose} onSubmit={onSubmitHandler} submitButtonColor={BUTTON_COLORS.green} />
    </Modal>
  );
};

UniversalModal.propTypes = {
  setFade: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withModalFade(UniversalModal);
