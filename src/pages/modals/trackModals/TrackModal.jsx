import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { changeDateFormat } from '../../../scripts/helpers';
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
import { withModalFade } from '../../../HOCs/withModalFade';

class TrackModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initTrackModalState;
  }

  componentDidMount() {
    const { track, taskName } = this.props;
    const state = gatherTrackModalState(track, taskName);
    this.setState(state);
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
    } else {
      const { setFade } = this.props;
      setFade();
      if (track) {
        updateTrack(submitTrack);
      } else {
        addTrack(submitTrack);
      }
    }
  };

  resetFieldError = (name) => {
    this.setState((prevState) => ({ ...prevState, formErrors: { ...prevState.formErrors, [name]: '' } }));
  };

  render() {
    const { active, onClose } = this.props;
    const { modalTitle, note, date, formErrors, taskName, readOnly } = this.state;

    return (
      <Modal disableModalMode={onClose} active={active}>
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
            disableModalMode={onClose}
            onSubmit={this.submitTrack}
            submitButtonColor={modalTitle === TRACK_MODAL_TITLES.edit ? BUTTON_COLORS.green : BUTTON_COLORS.blue}
          />
        </form>
      </Modal>
    );
  }
}

TrackModal.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setFade: PropTypes.func.isRequired,
  addTrack: PropTypes.func.isRequired,
  updateTrack: PropTypes.func.isRequired,
  track: PropTypes.shape({
    note: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
  taskName: PropTypes.string.isRequired,
};
TrackModal.defaultProps = {
  track: null,
};

export default withModalFade(TrackModal);
