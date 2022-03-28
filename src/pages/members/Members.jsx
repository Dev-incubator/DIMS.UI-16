import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Members.module.css';
import { MemberInfoRow } from './memberInfoRow/MemberInfoRow';
import { TableHeader } from '../helpers/TableHeader';
import { DeleteModal } from '../modals/deleteModal/DeleteModal';
import { PageHeader } from '../helpers/PageHeader';
import { getAge } from '../../scripts/helpers';
import {
  ALERT_MODES,
  DELETE_VALUES,
  HEADER_VALUES,
  MODAL_MODES,
  PAGE_TITLES,
  USER_ROLES,
} from '../../scripts/libraries';
import { UserModal } from '../modals/userModal/UserModal';
import pageStyles from '../Page.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';
import { AuthContext } from '../../providers/AuthProvider';
import { Loading } from '../loading/Loading';
import { createUserThunk, getUsersThunk, removeUserThunk, updateUserThunk } from '../../redux/usersThunk/userThunks';
import { CustomAlert } from '../../components/Alert/Alert';

const memberTableTitles = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Action'];

function Members({ getUsers, createUser, updateUser, removeUser, users, isFetching, error }) {
  const [modalValues, setModalValues] = useState({ mode: null, actionId: null });

  useEffect(() => {
    getUsers();
  }, []);

  const setModalMode = (mode, actionId = null) => {
    setModalValues({ mode, actionId });
  };

  const disableModalMode = () => {
    setModalValues({ mode: null, actionId: null });
  };

  const createUserHandler = (user) => {
    createUser(user);
    disableModalMode();
  };

  const updateUserHandler = (user) => {
    updateUser(modalValues.actionId, user);
    disableModalMode();
  };

  const removeUserHandler = () => {
    removeUser(modalValues.actionId);
    disableModalMode();
  };

  const actionUser = users.find((item) => item.id === modalValues.actionId);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <AuthContext.Consumer>
          {({ user: { role } }) => (
            <div>
              {isFetching && <Loading />}
              <CustomAlert isActive={!!error} variant={ALERT_MODES.fail} text={error} />
              {role === USER_ROLES.mentor ? (
                <div className={styles.header} style={{ color: theme.textColor }}>
                  <div className={pageStyles.pageTitle}>{HEADER_VALUES.members}</div>
                </div>
              ) : (
                <PageHeader text={PAGE_TITLES.members} onClick={() => setModalMode(MODAL_MODES.create)} />
              )}
              <table className={styles.members} style={{ color: theme.textColor }}>
                <TableHeader titles={memberTableTitles} />
                <tbody>
                  {users.map((user, index) => {
                    const setDeleteMode = () => {
                      setModalMode(MODAL_MODES.delete, user.id);
                    };
                    const setEditMode = () => {
                      setModalMode(MODAL_MODES.edit, user.id);
                    };
                    const setReadMode = () => {
                      setModalMode(MODAL_MODES.read, user.id);
                    };

                    return (
                      <MemberInfoRow
                        key={user.id}
                        id={user.id}
                        direction={user.direction}
                        name={user.name}
                        surname={user.surname}
                        number={index + 1}
                        role={role}
                        age={getAge(user.birthDate)}
                        education={user.education}
                        startDate={user.startDate}
                        setEditMode={setEditMode}
                        setReadMode={setReadMode}
                        setDeleteMode={setDeleteMode}
                      />
                    );
                  })}
                </tbody>
              </table>
              <DeleteModal
                target={DELETE_VALUES.member}
                active={modalValues.mode === MODAL_MODES.delete}
                removeHandler={removeUserHandler}
                cancelHandler={disableModalMode}
              />
              <UserModal
                updateUser={updateUserHandler}
                createUser={createUserHandler}
                user={actionUser}
                disableModalMode={disableModalMode}
                readOnly={modalValues.mode === MODAL_MODES.read}
                active={!!modalValues.mode && modalValues.mode !== MODAL_MODES.delete}
              />
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
    isFetching: state.fetch.isFetching,
    error: state.fetch.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsersThunk()),
    removeUser: (id) => dispatch(removeUserThunk(id)),
    createUser: (user) => dispatch(createUserThunk(user)),
    updateUser: (id, user) => dispatch(updateUserThunk(id, user)),
  };
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
  store: PropTypes.shape({}).isRequired,
};
Members.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
