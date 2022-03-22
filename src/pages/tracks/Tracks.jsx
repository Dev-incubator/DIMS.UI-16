import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Tracks.module.css';
import { TableHeader } from '../helpers/TableHeader';
import { TrackRow } from './trackRow/TrackRow';
import { addTrack, deleteTrack, getTaskById, getTaskTrack, updateTrack } from '../../scripts/api-service';
import { DeleteModal } from '../modals/deleteModal/DeleteModal';
import { deepEqual } from '../../scripts/helpers';
import { PageHeader } from '../helpers/PageHeader';
import { DELETE_VALUES, MODAL_MODES, PAGE_TITLES } from '../../constants/libraries';
import { TrackModal } from '../modals/trackModals/TrackModal';

const tableTitles = ['#', 'Task', 'Note', 'Date', 'Action'];

const initTracksState = {
  taskName: '',
  tracks: [],
  modalMode: null,
  actionTrackId: null,
};

export class Tracks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initTracksState;
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.getData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!deepEqual(prevState, this.state) && !deepEqual(prevState, initTracksState)) {
      await this.getData();
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  addTrack = async (track) => {
    const { match } = this.props;
    const { userId, taskId } = match.params;
    await addTrack({ ...track, userId, taskId });
    this.disableModalMode();
  };

  getData = async () => {
    const { match } = this.props;
    const { userId, taskId } = match.params;
    const tracks = await getTaskTrack(userId, taskId);
    const task = await getTaskById(taskId);
    if (this.isComponentMounted) {
      this.setState((prevState) => ({ ...prevState, tracks, taskName: task.title }));
    }
  };

  updateTrack = async (track) => {
    const { match } = this.props;
    const { userId, taskId } = match.params;
    const { actionTrackId, tracks } = this.state;
    const updatedTrack = { ...track, userId, taskId };
    const prevTrack = tracks.find((task) => task.id === actionTrackId);
    if (!deepEqual(prevTrack, { ...updatedTrack, id: actionTrackId })) {
      await updateTrack(actionTrackId, updatedTrack);
    }
    this.disableModalMode();
  };

  setModalMode = (modalMode, actionTrackId = null) => {
    this.setState({ modalMode, actionTrackId });
  };

  disableModalMode = () => {
    this.setState({ modalMode: null, actionTrackId: null });
  };

  removeTrack = async () => {
    const { actionTrackId } = this.state;
    await deleteTrack(actionTrackId);
    this.disableModalMode();
  };

  render() {
    const { tracks, modalMode, actionTrackId, taskName } = this.state;
    const actionTrack = tracks.find((task) => task.id === actionTrackId);

    return (
      <div>
        <PageHeader text={PAGE_TITLES.tracks} onClick={() => this.setModalMode(MODAL_MODES.create)} />
        <table className={styles.tracks}>
          <TableHeader titles={tableTitles} />
          <tbody>
            {tracks.map((track, index) => {
              const setEditMode = () => {
                this.setModalMode(MODAL_MODES.edit, track.id);
              };
              const setDeleteMode = () => {
                this.setModalMode(MODAL_MODES.delete, track.id);
              };

              return (
                <TrackRow
                  key={track.id}
                  title={track.taskTitle}
                  note={track.note}
                  date={track.date}
                  number={index + 1}
                  taskId={track.taskId}
                  userId={track.userId}
                  setEditMode={setEditMode}
                  setDeleteMode={setDeleteMode}
                />
              );
            })}
          </tbody>
        </table>
        <TrackModal
          addTrack={this.addTrack}
          updateTrack={this.updateTrack}
          disableModalMode={this.disableModalMode}
          active={!!modalMode && modalMode !== MODAL_MODES.delete}
          track={actionTrack}
          taskName={taskName}
        />
        <DeleteModal
          target={DELETE_VALUES.track}
          active={modalMode === MODAL_MODES.delete}
          removeHandler={this.removeTrack}
          cancelHandler={this.disableModalMode}
        />
      </div>
    );
  }
}

Tracks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      taskId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
