import { AuthContext } from '../providers/AuthProvider';

export const withAuthContext = (Component) => {
  return (props) => {
    return (
      <AuthContext.Consumer>
        {(context) => {
          return <Component {...props} context={context} />;
        }}
      </AuthContext.Consumer>
    );
  };
};
