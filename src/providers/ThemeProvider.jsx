import React from 'react';

export const themes = {
  light: {
    primaryColor: 'var(--primary)',
    warningColor: 'var(--warning)',
    errorColor: 'var(--error)',
    secondaryColor: 'var(--secondary)',
    grayColor: 'var(--gray)',
    successColor: 'var(--success)',
    borderColor: 'var(--borderColor)',
    backgroundColor: 'var(--bgColor)',
  },
  dark: {
    borderColor: '#222222',
    backgroundColor: '#435534',
  },
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  changeTheme: () => {},
});
