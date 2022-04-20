import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Tracks.module.css';
import { TableHeader } from '../helpers/TableHeader';
import { TrackRow } from './trackRow/TrackRow';
import { addTrack, deleteTrack, getTaskById, getTaskTrack, updateTrack } from '../../scripts/api-service';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import { deepEqual } from '../../scripts/helpers';
import { PageHeader } from '../helpers/PageHeader';
import { ALERT_MODES, DELETE_VALUES, MODAL_MODES, PAGE_TITLES } from '../../constants/libraries';
import TrackModal from '../modals/trackModals/TrackModal';
import { withModal } from '../../HOCs/withModal';
import { ThemeContext } from '../../providers/ThemeProvider';
import { Loading } from '../loading/Loading';
import {
  addTrackAction,
  removeTrackAction,
  setTracksAction,
  tracksReducer,
  updateTrackAction,
} from './tracksReducer/tracksReducer';
import { CustomAlert } from '../../components/Alert/Alert';

const tableTitles = ['#', 'Task', 'Note', 'Date', 'Action'];

function Tracks({ match, mode, actionId, openModal, closeModal }) {
  const [error, setError] = useState('');
  const [taskName, setTaskName] = useState('');
  const [tracks, dispatch] = useReducer(tracksReducer, []);

  useEffect(() => {
    const { userId, taskId } = match.params;
    (async function fetchData() {
      const data = await getTaskTrack(userId, taskId);
      dispatch(setTracksAction(data));
      const task = await getTaskById(taskId);
      setTaskName(task.title);
    })();
  }, []);

  const addTrackHandler = async (track) => {
    const { userId, taskId } = match.params;
    const newTrack = { ...track, userId, taskId };
    try {
      const doc = await addTrack(newTrack);
      dispatch(addTrackAction(newTrack, doc.id));
    } catch (e) {
      console.error(e);
      setError('Something went wrong');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
    closeModal();
  };

  const updateTrackHandler = async (track) => {
    const { userId, taskId } = match.params;
    const updatedTrack = { ...track, userId, taskId };
    const prevTrack = tracks.find((task) => task.id === actionId);
    if (!deepEqual(prevTrack, { ...updatedTrack, id: actionId })) {
      await updateTrack(actionId, updatedTrack);
      dispatch(updateTrackAction(updatedTrack, actionId));
    }
    closeModal();
  };

  const removeTrackHandler = async () => {
    await deleteTrack(actionId);
    dispatch(removeTrackAction(actionId));
    closeModal();
  };

  const actionTrack = tracks.find((task) => task.id === actionId);
  if (!taskName) {
    return <Loading />;
  }

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div>
          <CustomAlert isActive={!!error} variant={ALERT_MODES.fail} text={error} />
          <PageHeader text={PAGE_TITLES.tracks} onClick={openModal} />
          <table className={`${styles.tracks} ${styles[theme]}`}>
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
              addTrack={addTrackHandler}
              updateTrack={updateTrackHandler}
              onClose={closeModal}
              track={actionTrack}
              taskName={taskName}
            />
          ) : null}
          {mode === MODAL_MODES.delete && (
            <DeleteModal
              target={DELETE_VALUES.track}
              active={mode === MODAL_MODES.delete}
              onRemove={removeTrackHandler}
              onClose={closeModal}
            />
          )}
        </div>
      )}
    </ThemeContext.Consumer>
  );
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
