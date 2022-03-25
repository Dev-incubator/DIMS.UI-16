import { Route } from 'react-router-dom';
import { About } from '../../pages/about/About';
import { LogIn } from '../../pages/logIn/LogIn';
import { SetPassword } from '../../pages/setPassword/SetPassword';

export function SpectatorRoutes() {
  return (
    <div>
      <Route path='/about' exact component={About} />
      <Route path='/login' exact render={() => <LogIn />} />
      <Route path='/resetPassword' component={SetPassword} />
    </div>
  );
}
