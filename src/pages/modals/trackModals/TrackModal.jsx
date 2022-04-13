import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { changeDateFormat } from '../../../scripts/helpers';
import { Modal } from '../../../components/Modal/Modal';
import styles from './TrackModal.module.css';
import {
  BUTTON_COLORS,
  INPUT_NAMES,
  INPUT_TYPES,
  MODAL_VALUES,
  TRACK_MODAL_TITLES,
} from '../../../constants/libraries';
import { FormSubmit } from '../form/formSubmit/FormSubmit';
import { gatherTrackModalState, getTrackModalErrors, trackModalState } from './trackModalHelpers';
import { withModalFade } from '../../../HOCs/withModalFade';
import { Input } from '../form/ModalFields/Input';

class TrackModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = trackModalState;
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
    const errors = getTrackModalErrors(this.state);
    const submitTrack = { note, date: changeDateFormat(date) };
    if (errors) {
      this.setState({ errors });
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
    this.setState((prevState) => ({ ...prevState, errors: { ...prevState.errors, [name]: '' } }));
  };

  render() {
    const { active, onClose } = this.props;
    const { title, note, date, errors, taskName, readOnly } = this.state;

    return (
      <Modal onClose={onClose} active={active}>
        <div className={styles.title}>{title}</div>
        <form className={styles.form}>
          <Input title={MODAL_VALUES.task} value={taskName} type={INPUT_TYPES.text} readOnly />
          <Input
            value={date}
            title={MODAL_VALUES.date}
            placeholder={MODAL_VALUES.date}
            type={INPUT_TYPES.date}
            readOnly={readOnly}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.date}
            error={errors.date}
          />
          <Input
            value={note}
            title={MODAL_VALUES.note}
            placeholder={MODAL_VALUES.note}
            type={INPUT_TYPES.text}
            readOnly={readOnly}
            onChange={this.onChangeInputValue}
            fieldName={INPUT_NAMES.note}
            error={errors.note}
          />
          <FormSubmit
            onClose={onClose}
            onSubmit={this.submitTrack}
            submitButtonColor={title === TRACK_MODAL_TITLES.edit ? BUTTON_COLORS.green : BUTTON_COLORS.blue}
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
