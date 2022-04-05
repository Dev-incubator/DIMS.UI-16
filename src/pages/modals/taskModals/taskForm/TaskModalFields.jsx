import PropTypes from 'prop-types';
import { FormField } from '../../form/formField/FormField';
import { INPUT_NAMES, INPUT_TYPES, MODAL_VALUES } from '../../../../constants/libraries';
import noop from '../../../../shared/noop';

export function TaskModalFields({ formErrors, title, description, startDate, deadline, onChangeInputValue, readOnly }) {
  return (
    <div>
      <FormField
        onChange={onChangeInputValue}
        inputValue={title}
        error={formErrors.title}
        readOnly={readOnly}
        inputName={INPUT_NAMES.title}
        fieldName={MODAL_VALUES.name}
        stylingType={INPUT_TYPES.text}
      />
      <FormField
        fieldName={MODAL_VALUES.description}
        onChange={onChangeInputValue}
        inputName={INPUT_NAMES.description}
        readOnly={readOnly}
        inputValue={description}
        stylingType={INPUT_TYPES.text}
      />
      <FormField
        fieldName={MODAL_VALUES.startDate}
        onChange={onChangeInputValue}
        inputName={INPUT_NAMES.startDate}
        readOnly={readOnly}
        error={formErrors.startDate}
        inputValue={startDate}
        stylingType={INPUT_TYPES.date}
      />
      <FormField
        fieldName={MODAL_VALUES.deadline}
        onChange={onChangeInputValue}
        inputName={INPUT_NAMES.deadline}
        readOnly={readOnly}
        error={formErrors.deadline}
        inputValue={deadline}
        stylingType={INPUT_TYPES.date}
      />
    </div>
  );
}

TaskModalFields.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  onChangeInputValue: PropTypes.func,
  readOnly: PropTypes.bool,
  formErrors: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.string,
    users: PropTypes.string,
    deadline: PropTypes.string,
  }),
};

TaskModalFields.defaultProps = {
  onChangeInputValue: noop,
  readOnly: false,
  formErrors: {
    title: '',
    startDate: '',
    deadline: '',
    users: '',
  },
};
