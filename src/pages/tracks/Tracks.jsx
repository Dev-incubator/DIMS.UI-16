import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Tracks.module.css';
import { TableHeader } from '../helpers/TableHeader';
import { TrackRow } from './trackRow/TrackRow';
import { addTrack, deleteTrack, getTaskById, getTaskTrack, updateTrack } from '../../scripts/api-service';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import { deepEqual } from '../../scripts/helpers';
import { PageHeader } from '../helpers/PageHeader';
import { DELETE_VALUES, MODAL_MODES, PAGE_TITLES } from '../../constants/libraries';
import TrackModal from '../modals/trackModals/TrackModal';
import { withModal } from '../../HOCs/withModal';
import { ThemeContext } from '../../providers/ThemeProvider';
import { Loading } from '../loading/Loading';

const tableTitles = ['#', 'Task', 'Note', 'Date', 'Action'];

const initTracksState = {
  taskName: '',
  tracks: [],
};

class Tracks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initTracksState;
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.getData();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      await this.getData();
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  addTrack = async (track) => {
    const { match, closeModal } = this.props;
    const { userId, taskId } = match.params;
    await addTrack({ ...track, userId, taskId });
    closeModal();
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
    const { match, actionId, closeModal } = this.props;
    const { userId, taskId } = match.params;
    const { tracks } = this.state;
    const updatedTrack = { ...track, userId, taskId };
    const prevTrack = tracks.find((task) => task.id === actionId);
    if (!deepEqual(prevTrack, { ...updatedTrack, id: actionId })) {
      await updateTrack(actionId, updatedTrack);
    }
    closeModal();
  };

  removeTrack = async () => {
    const { closeModal, actionId } = this.props;
    await deleteTrack(actionId);
    closeModal();
  };

  render() {
    const { tracks, taskName } = this.state;
    const { mode, actionId, openModal, closeModal } = this.props;
    const actionTrack = tracks.find((task) => task.id === actionId);

    if (!taskName) {
      return <Loading />;
    }

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div>
            <PageHeader text={PAGE_TITLES.tracks} onClick={openModal} />
            <table className={styles.tracks} style={{ color: theme.textColor }}>
              <TableHeader titles={tableTitles} />
              <tbody>
                {tracks.map((track, index) => {
                  const openEditModal = () => {
                    openModal(MODAL_MODES.edit, track.id);
                  };
                  const openDeleteModal = () => {
                    openModal(MODAL_MODES.delete, track.id);
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
                      openEditModal={openEditModal}
                      openDeleteModal={openDeleteModal}
                    />
                  );
                })}
              </tbody>
            </table>
            {mode && mode !== MODAL_MODES.delete ? (
              <TrackModal
                addTrack={this.addTrack}
                updateTrack={this.updateTrack}
                onClose={closeModal}
                track={actionTrack}
                taskName={taskName}
              />
            ) : null}
            {mode === MODAL_MODES.delete && (
              <DeleteModal
                target={DELETE_VALUES.track}
                active={mode === MODAL_MODES.delete}
                onRemove={this.removeTrack}
                onClose={closeModal}
              />
            )}
          </div>
        )}
      </ThemeContext.Consumer>
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
  mode: PropTypes.string,
  actionId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

Tracks.defaultProps = {
  mode: null,
  actionId: null,
};

export default withModal(Tracks);
