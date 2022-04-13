import PropTypes from 'prop-types';
import { INPUT_NAMES, INPUT_TYPES, MODAL_VALUES } from '../../../../constants/libraries';
import noop from '../../../../shared/noop';
import { Input } from '../../form/ModalFields/Input';

export function TaskModalFields({ errors, title, description, startDate, deadline, onChangeInputValue, readOnly }) {
  return (
    <div>
      <Input
        placeholder={MODAL_VALUES.name}
        fieldName={INPUT_NAMES.title}
        title={MODAL_VALUES.name}
        type={INPUT_TYPES.text}
        readOnly={readOnly}
        error={errors.title}
        onChange={onChangeInputValue}
        value={title}
      />
      <Input
        placeholder={MODAL_VALUES.description}
        fieldName={INPUT_NAMES.description}
        title={MODAL_VALUES.description}
        type={INPUT_TYPES.text}
        readOnly={readOnly}
        error={errors.title}
        onChange={onChangeInputValue}
        value={description}
      />
      <Input
        placeholder={MODAL_VALUES.startDate}
        fieldName={INPUT_NAMES.startDate}
        title={MODAL_VALUES.startDate}
        type={INPUT_TYPES.date}
        readOnly={readOnly}
        error={errors.startDate}
        onChange={onChangeInputValue}
        value={startDate}
      />
      <Input
        placeholder={MODAL_VALUES.deadline}
        fieldName={INPUT_NAMES.deadline}
        title={MODAL_VALUES.deadline}
        type={INPUT_TYPES.date}
        readOnly={readOnly}
        error={errors.deadline}
        onChange={onChangeInputValue}
        value={deadline}
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
  errors: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.string,
    users: PropTypes.string,
    deadline: PropTypes.string,
  }),
};

TaskModalFields.defaultProps = {
  onChangeInputValue: noop,
  readOnly: false,
  errors: {
    title: '',
    startDate: '',
    deadline: '',
    users: '',
  },
};
