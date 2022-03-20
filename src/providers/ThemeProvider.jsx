import React from 'react';

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
