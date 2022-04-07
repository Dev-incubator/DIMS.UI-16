import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Members.module.css';
import { MemberInfoRow } from './memberInfoRow/MemberInfoRow';
import { TableHeader } from '../helpers/TableHeader';
import { getAllUsers, updateUser, createUserAuth, deleteUserAuth } from '../../scripts/api-service';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import { PageHeader } from '../helpers/PageHeader';
import { getAge } from '../../scripts/helpers';
import UserModal from '../modals/userModal/UserModal';
import { DELETE_VALUES, MODAL_MODES, PAGE_TITLES } from '../../constants/libraries';
import { withModal } from '../../HOCs/withModal';

const memberTableTitles = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Action'];

class Members extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
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

  getData = async () => {
    const users = await getAllUsers();
    if (this.isComponentMounted) {
      this.setState((prevState) => ({ ...prevState, users }));
    }
  };

  createUser = async (user) => {
    const { closeModal } = this.props;
    await createUserAuth(user);
    closeModal();
  };

  updateUser = async (user) => {
    const { closeModal, actionId } = this.props;
    await updateUser(actionId, user);
    closeModal();
  };

  removeUser = async () => {
    const { closeModal, actionId } = this.props;
    const { users } = this.state;
    const user = users.find((item) => item.id === actionId);
    await deleteUserAuth(user);
    closeModal();
  };

  render() {
    const { users } = this.state;
    const { mode, actionId, openModal, closeModal } = this.props;
    const actionUser = users.find((item) => item.id === actionId);

    return (
      <div>
        <PageHeader text={PAGE_TITLES.members} onClick={openModal} />
        <table className={styles.members}>
          <TableHeader titles={memberTableTitles} />
          <tbody>
            {users.map((user, index) => {
              const openDeleteModal = () => {
                openModal(MODAL_MODES.delete, user.id);
              };
              const openEditModal = () => {
                openModal(MODAL_MODES.edit, user.id);
              };
              const openReadModal = () => {
                openModal(MODAL_MODES.read, user.id);
              };

              return (
                <MemberInfoRow
                  key={user.id}
                  id={user.id}
                  direction={user.direction}
                  name={user.name}
                  surname={user.surname}
                  number={index + 1}
                  age={getAge(user.birthDate)}
                  education={user.education}
                  startDate={user.startDate}
                  openEditModal={openEditModal}
                  openReadModal={openReadModal}
                  openDeleteModal={openDeleteModal}
                />
              );
            })}
          </tbody>
        </table>
        {mode === MODAL_MODES.delete && (
          <DeleteModal target={DELETE_VALUES.member} onRemove={this.removeUser} onClose={closeModal} />
        )}
        {!!mode && mode !== MODAL_MODES.delete ? (
          <UserModal
            updateUser={this.updateUser}
            createUser={this.createUser}
            user={actionUser}
            onClose={closeModal}
            readOnly={mode === MODAL_MODES.read}
          />
        ) : null}
      </div>
    );
  }
}

Members.propTypes = {
  mode: PropTypes.string,
  actionId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
Members.defaultProps = {
  mode: null,
  actionId: null,
};

export default withModal(Members);
