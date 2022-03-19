import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { About } from '../../pages/about/About';
import { LogIn } from '../../pages/logIn/LogIn';
import { SetPassword } from '../../pages/setPassword/SetPassword';

export function SpectatorRoutes({ logIn }) {
  return (
    <div>
      <Route path='/about' exact component={About} />
      <Route path='/login' exact render={() => <LogIn logIn={logIn} />} />
      <Route path='/resetPassword' component={SetPassword} />
    </div>
  );
}

SpectatorRoutes.propTypes = {
  logIn: PropTypes.func.isRequired,
};
