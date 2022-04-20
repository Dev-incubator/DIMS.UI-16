import { ThemeContext } from '../providers/ThemeProvider';

export const withThemeContext = (Component) => {
  return (props) => {
    return (
      <ThemeContext.Consumer>
        {(context) => {
          return <Component {...props} context={context} />;
        }}
      </ThemeContext.Consumer>
    );
  };
};
