import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

export class ThemeProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.toggleTheme = (theme) => {
      localStorage.setItem('theme', theme);
      this.setState((prevState) => ({
        themeContext: { ...prevState.themeContext, theme },
      }));
    };

    this.state = {
      themeContext: {
        theme: 'dark',
        toggleTheme: this.toggleTheme,
      },
    };
  }

  componentDidMount() {
    this.setStartTheme();
  }

  setStartTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setState((prevState) => ({
        themeContext: { ...prevState.themeContext, theme },
      }));
    }
  };

  render() {
    const { children } = this.props;
    const { themeContext } = this.state;

    return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
