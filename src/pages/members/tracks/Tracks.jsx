import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pageStyles from '../MemberPage.module.css';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../scripts/libraries';
import { Button } from '../../../components/Buttons/Button/Button';
import styles from './Tracks.module.css';
import { TableHeader } from '../../helpers/TableHeader';
import { TrackRow } from './trackRow/TrackRow';
import { getTaskTrack } from '../../../scripts/api-service';

const tableTitles = ['#', 'Task', 'Note', 'Date', 'Action'];

export class Tracks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { userId, taskId } = match.params;
    const tracks = await getTaskTrack(userId, taskId);
    this.setState((prevState) => ({ ...prevState, tracks }));
  }

  render() {
    const { tracks } = this.state;

    return (
      <div>
        <div className={pageStyles.header}>
          <div className={pageStyles.pageTitle}>Current task tracks</div>
          <Button color={BUTTON_COLORS.blue}>{BUTTON_VALUES.create}</Button>
        </div>
        <table className={styles.tracks}>
          <TableHeader titles={tableTitles} />
          <tbody>
            {tracks.map((track, index) => (
              <TrackRow
                key={track.id}
                title={track.taskTitle}
                note={track.note}
                date={track.date}
                number={index + 1}
                taskId={track.taskId}
                userId={track.userId}
              />
            ))}
          </tbody>
        </table>
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
