import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const themes = {
  light: {
    borderColor: 'var(--borderLight)',
    backgroundColor: 'var(--bgLight)',
    headerColor: 'var(--blue)',
    tableHeader: 'var(--gray)',
    textColor: 'var(--black)',
    primary: 'var(--blue)',
    warning: 'var(--orange)',
    success: 'var(--green)',
    secondary: 'var(--secondary)',
    error: 'var(--red)',
  },
  dark: {
    borderColor: 'var(--gray)',
    backgroundColor: 'var(--bgDark)',
    headerColor: 'var(--borderDark)',
    tableHeader: 'var(--darkGray)',
    textColor: 'var(--gray)',
    primary: 'var(--darkBlue)',
    warning: 'var(--darkOrange)',
    success: 'var(--darkGreen)',
    secondary: 'var(--secondary)',
    error: 'var(--darkRed)',
  },
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  changeTheme: () => {},
});

export class ThemeProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.toggleTheme = (value) => {
      localStorage.setItem('theme', value);
      this.setState((prevState) => ({
        themeContext: { ...prevState.themeContext, theme: themes[value] },
      }));
    };

    this.state = {
      themeContext: {
        theme: themes.light,
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
        themeContext: { ...prevState.themeContext, theme: themes[theme] },
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
