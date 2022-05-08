import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Members.module.css';
import { MemberInfoRow } from './memberInfoRow/MemberInfoRow';
import { TableHeader } from '../helpers/TableHeader';
import pageStyles from '../Page.module.css';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import { PageHeader } from '../helpers/PageHeader';
import { getAge } from '../../scripts/helpers';
import UserModal from '../modals/userModal/UserModal';
import {
  ALERT_MODES,
  DELETE_VALUES,
  HEADER_VALUES,
  MODAL_MODES,
  PAGE_TITLES,
  USER_ROLES,
} from '../../constants/libraries';
import { withModal } from '../../HOCs/withModal';
import { ThemeContext } from '../../providers/ThemeProvider';
import { AuthContext } from '../../providers/AuthProvider';
import { createUserThunk, getUsersThunk, removeUserThunk, updateUserThunk } from '../../redux/users/thunks/usersThunk';
import { Loading } from '../loading/Loading';
import { CustomAlert } from '../../components/Alert/Alert';

const memberTableTitles = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Action'];

function Members({
  mode,
  actionId,
  openModal,
  closeModal,
  users,
  error,
  isFetching,
  removeUser,
  updateUser,
  createUser,
  getUsers,
}) {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const createUserHandler = (user) => {
    createUser(user);
    closeModal();
  };

  const updateUserHandler = (user) => {
    updateUser(actionId, user);
    closeModal();
  };

  const removeUserHandler = () => {
    removeUser(actionId);
    closeModal();
  };

  const actionUser = users.find((item) => item.id === actionId);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <AuthContext.Consumer>
          {({ user: { role } }) => (
            <div>
              {isFetching && <Loading />}
              <CustomAlert isActive={!!error} variant={ALERT_MODES.fail} text={error} />
              {role === USER_ROLES.mentor ? (
                <div className={`${styles.header} ${styles[theme]}`}>
                  <div className={pageStyles.pageTitle}>{HEADER_VALUES.members}</div>
                </div>
              ) : (
                <PageHeader text={PAGE_TITLES.members} onClick={openModal} />
              )}
              <table className={`${styles.members} ${styles[theme]}`}>
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
                <DeleteModal target={DELETE_VALUES.member} onRemove={removeUserHandler} onClose={closeModal} />
              )}
              {!!mode && mode !== MODAL_MODES.delete ? (
                <UserModal
                  updateUser={updateUserHandler}
                  createUser={createUserHandler}
                  user={actionUser}
                  onClose={closeModal}
                  readOnly={mode === MODAL_MODES.read}
                />
              ) : null}
            </div>
          )}
        </AuthContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

function mapStateToProps(state) {
  return {
    users: state.users,
    isFetching: state.usersLoader,
    error: state.usersError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getUsers: getUsersThunk, removeUser: removeUserThunk, updateUser: updateUserThunk, createUser: createUserThunk },
    dispatch,
  );
}

Members.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      direction: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      birthDate: PropTypes.string,
      education: PropTypes.string,
      startDate: PropTypes.string,
    }),
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  getUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  actionId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withModal(Members));
