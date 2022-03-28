import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Tracks.module.css';
import { TableHeader } from '../helpers/TableHeader';
import { TrackRow } from './trackRow/TrackRow';
import { addTrack, deleteTrack, getTaskById, getTaskTrack, updateTrack } from '../../scripts/api-service';
import { DeleteModal } from '../modals/deleteModal/DeleteModal';
import { deepEqual } from '../../scripts/helpers';
import { PageHeader } from '../helpers/PageHeader';
import { DELETE_VALUES, MODAL_MODES } from '../../scripts/libraries';
import { TrackModal } from '../modals/trackModals/TrackModal';
import { ThemeContext } from '../../providers/ThemeProvider';
import { Loading } from '../loading/Loading';
import { addTrackAC, removeTrackAC, setTracksAC, tracksReducer, updateTrackAC } from './tracksReducer/tracksReducer';

const tableTitles = ['#', 'Task', 'Note', 'Date', 'Action'];

export function Tracks({ match }) {
  const [modalValues, setModalValues] = useState({ mode: null, actionId: null });
  const [taskName, setTaskName] = useState('');
  const [tracks, dispatch] = useReducer(tracksReducer, []);

  useEffect(() => {
    const { userId, taskId } = match.params;
    (async function fetchData() {
      const data = await getTaskTrack(userId, taskId);
      dispatch(setTracksAC(data));
      const task = await getTaskById(taskId);
      setTaskName(task.title);
    })();
  }, []);

  const addTrackHandler = (track) => {
    const { userId, taskId } = match.params;
    const newTrack = { ...track, userId, taskId };
    addTrack(newTrack).then((doc) => {
      dispatch(addTrackAC(newTrack, doc.id));
    });
    disableModalMode();
  };

  const updateTrackHandler = async (track) => {
    const { userId, taskId } = match.params;
    const { actionId } = modalValues;
    const updatedTrack = { ...track, userId, taskId };
    const prevTrack = tracks.find((task) => task.id === actionId);
    if (!deepEqual(prevTrack, { ...updatedTrack, id: actionId })) {
      await updateTrack(actionId, updatedTrack);
      dispatch(updateTrackAC(updatedTrack, actionId));
    }
    disableModalMode();
  };

  const removeTrackHandler = async () => {
    const { actionId } = modalValues;
    await deleteTrack(actionId);
    dispatch(removeTrackAC(actionId));
    disableModalMode();
  };

  const setModalMode = (mode, actionId = null) => {
    setModalValues({ mode, actionId });
  };

  const disableModalMode = () => {
    setModalValues({ mode: null, actionId: null });
  };

  const actionTrack = tracks.find((task) => task.id === modalValues.actionId);

  if (!taskName) {
    return <Loading />;
  }

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div>
          <PageHeader text={`"${taskName}" tracks`} onClick={() => setModalMode(MODAL_MODES.create)} />
          <table className={styles.tracks} style={{ color: theme.textColor }}>
            <TableHeader titles={tableTitles} />
            <tbody>
              {tracks.map((track, index) => {
                const setEditMode = () => {
                  setModalMode(MODAL_MODES.edit, track.id);
                };
                const setDeleteMode = () => {
                  setModalMode(MODAL_MODES.delete, track.id);
                };

                return (
                  <TrackRow
                    key={track.id}
                    title={taskName}
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
            addTrack={addTrackHandler}
            updateTrack={updateTrackHandler}
            disableModalMode={disableModalMode}
            active={!!modalValues.mode && modalValues.mode !== MODAL_MODES.delete}
            track={actionTrack}
            taskName={taskName}
          />
          <DeleteModal
            target={DELETE_VALUES.track}
            active={modalValues.mode === MODAL_MODES.delete}
            removeHandler={removeTrackHandler}
            cancelHandler={disableModalMode}
          />
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
};
