import { useEffect, useState } from 'react';

export const withAdaptive = (Component) => (props) => {
  const screen = window.matchMedia('(max-width:512px)');
  const [isAdaptive, setIsAdaptive] = useState(screen.matches);

  useEffect(() => {
    const onScreenChanged = () => {
      setIsAdaptive(screen.matches);
    };
    screen.addEventListener('change', onScreenChanged);

    return () => {
      screen.removeEventListener('change', onScreenChanged);
    };
  }, [screen]);

  return <Component {...props} isAdaptive={isAdaptive} />;
};
