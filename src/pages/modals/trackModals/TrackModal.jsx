import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { changeDateFormat, deepEqual } from '../../../scripts/helpers';
import { Modal } from '../../../components/Modal/Modal';
import styles from './TrackModal.module.css';
import { FormField } from '../form/formField/FormField';
import {
  BUTTON_COLORS,
  INPUT_NAMES,
  INPUT_TYPES,
  MODAL_VALUES,
  TRACK_MODAL_TITLES,
} from '../../../constants/libraries';
import { FormSubmit } from '../form/formSubmit/FormSubmit';
import { gatherTrackModalState, getTrackModalErrors, initTrackModalState } from './trackModalHelpers';

export class TrackModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initTrackModalState;
  }

  componentDidUpdate(prevProps) {
    const { active, track, taskName } = this.props;
    if (!deepEqual(prevProps, this.props) && active) {
      const state = gatherTrackModalState(track, taskName);
      this.setState(state);
    }
  }

  onChangeInputValue = (name, value) => {
    this.resetFieldError(name);
    this.setState({ [name]: value });
  };

  submitTrack = () => {
    const { track, addTrack, updateTrack } = this.props;
    const { note, date } = this.state;
    const formErrors = getTrackModalErrors(this.state);
    const submitTrack = { note, date: changeDateFormat(date) };
    if (formErrors) {
      this.setState({ formErrors });
    } else if (track) {
      updateTrack(submitTrack);
    } else {
      addTrack(submitTrack);
    }
  };

  resetFieldError = (name) => {
    this.setState((prevState) => ({ ...prevState, formErrors: { ...prevState.formErrors, [name]: '' } }));
  };

  render() {
    const { disableModalMode, active } = this.props;
    const { modalTitle, note, date, formErrors, taskName, readOnly } = this.state;

    return (
      <Modal disableModalMode={disableModalMode} active={active}>
        <div className={styles.title}>{modalTitle}</div>
        <form className={styles.form}>
          <FormField inputValue={taskName} fieldName={MODAL_VALUES.task} stylingType={INPUT_TYPES.text} readOnly />
          <FormField
            inputValue={date}
            fieldName={MODAL_VALUES.date}
            stylingType={INPUT_TYPES.date}
            readOnly={readOnly}
            inputName={INPUT_NAMES.date}
            onChange={this.onChangeInputValue}
            error={formErrors.date}
          />
          <FormField
            inputValue={note}
            fieldName={MODAL_VALUES.note}
            stylingType={INPUT_TYPES.text}
            readOnly={readOnly}
            inputName={INPUT_NAMES.note}
            error={formErrors.note}
            placeholder={MODAL_VALUES.note}
            onChange={this.onChangeInputValue}
            large
          />
          <FormSubmit
            disableModalMode={disableModalMode}
            onSubmit={this.submitTrack}
            submitButtonColor={modalTitle === TRACK_MODAL_TITLES.edit ? BUTTON_COLORS.green : BUTTON_COLORS.blue}
          />
        </form>
      </Modal>
    );
  }
}

TrackModal.propTypes = {
  addTrack: PropTypes.func.isRequired,
  updateTrack: PropTypes.func.isRequired,
  disableModalMode: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  track: PropTypes.shape({
    note: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
  taskName: PropTypes.string.isRequired,
};
TrackModal.defaultProps = {
  track: null,
};
