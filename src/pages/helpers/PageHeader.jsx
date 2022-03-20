import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import pageStyles from '../Page.module.css';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../scripts/libraries';
import noop from '../../shared/noop';
import { Button } from '../../components/Buttons/Button/Button';
import { ThemeContext } from '../../providers/ThemeProvider';

export function PageHeader({ text, onClick, isBackButton }) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={pageStyles.header} style={{ color: theme.textColor }}>
          <div className={pageStyles.pageTitle}>{text}</div>
          {isBackButton ? (
            <NavLink to='/users'>
              <Button onClick={onClick} isBackButton>
                {BUTTON_VALUES.backToList}
              </Button>
            </NavLink>
          ) : (
            <Button color={BUTTON_COLORS.blue} onClick={onClick}>
              {BUTTON_VALUES.create}
            </Button>
          )}
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isBackButton: PropTypes.bool,
};

PageHeader.defaultProps = {
  isBackButton: false,
  onClick: noop,
};
