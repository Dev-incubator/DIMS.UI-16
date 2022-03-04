import PropTypes from 'prop-types';
import modalStyles from '../../Modals.module.css';
import styles from './TaskModal.module.css';
import { FormField } from '../../form/formField/FormField';
import { BUTTON_COLORS, BUTTON_VALUES, INPUT_NAMES, INPUT_TYPES, MODAL_VALUES } from '../../../../scripts/libraries';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { Button } from '../../../../components/Buttons/Button/Button';
import { BackButton } from '../../../../components/Buttons/backButton/BackButton';
import noop from '../../../../shared/noop';

export function TaskModal({
  modalTitle,
  onChangeInput,
  title,
  description,
  startDate,
  deadline,
  users,
  readOnly,
  changeCheckboxValue,
  submitTask,
  closeModal,
}) {
  const onChangeInputValue = (name, value) => {
    onChangeInput(name, value);
  };

  return (
    <div className={modalStyles.popup}>
      <div className={`${modalStyles.popupContent} ${styles.content}`}>
        <div className={modalStyles.title}>{modalTitle}</div>
        <form className={styles.form}>
          <FormField
            onChange={onChangeInputValue}
            placeholder={MODAL_VALUES.name}
            inputValue={title}
            inputName={INPUT_NAMES.title}
            readOnly={readOnly}
            fieldName={MODAL_VALUES.name}
            stylingType={INPUT_TYPES.text}
          />
          <FormField
            fieldName={MODAL_VALUES.description}
            onChange={onChangeInputValue}
            inputName={INPUT_NAMES.description}
            readOnly={readOnly}
            placeholder={MODAL_VALUES.description}
            inputValue={description}
            stylingType={INPUT_TYPES.text}
          />
          <FormField
            fieldName={MODAL_VALUES.startDate}
            onChange={onChangeInputValue}
            inputName={INPUT_NAMES.startDate}
            readOnly={readOnly}
            inputValue={startDate}
            stylingType={INPUT_TYPES.date}
          />
          <FormField
            fieldName={MODAL_VALUES.deadline}
            onChange={onChangeInputValue}
            readOnly={readOnly}
            inputName={INPUT_NAMES.deadline}
            inputValue={deadline}
            stylingType={INPUT_TYPES.date}
          />
          <div className={styles.usersList}>
            <div className={styles.fieldName}>Members</div>
            <div className={styles.layer}>
              {readOnly
                ? users.map((user) => <div key={user.id}>{user.name}</div>)
                : users.map((user) => {
                    const onChangeHandler = (event) => {
                      changeCheckboxValue(user.id, event.currentTarget.checked);
                    };

                    return (
                      <Checkbox
                        key={user.id}
                        value={user.value}
                        onChange={onChangeHandler}
                        text={user.name}
                        id={user.id}
                      />
                    );
                  })}
            </div>
          </div>
          <div className={styles.buttonGroup}>
            {!readOnly && (
              <Button color={BUTTON_COLORS.green} onClick={submitTask}>
                {BUTTON_VALUES.save}
              </Button>
            )}
            <BackButton onClick={closeModal}>{BUTTON_VALUES.backToList}</BackButton>
          </div>
        </form>
      </div>
    </div>
  );
}

TaskModal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  deadline: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.bool,
    }),
  ).isRequired,
  readOnly: PropTypes.bool,
  changeCheckboxValue: PropTypes.func,
  submitTask: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
};

TaskModal.defaultProps = {
  onChangeInput: noop,
  title: '',
  description: '',
  startDate: '',
  deadline: '',
  readOnly: false,
  changeCheckboxValue: noop,
  submitTask: noop,
};
