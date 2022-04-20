import PropTypes from 'prop-types';
import pageStyles from '../Page.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';

export function TableHeader({ titles }) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th key={title + index.toString()} className={`${pageStyles.tableTitle} ${pageStyles[theme]}`}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
      )}
    </ThemeContext.Consumer>
  );
}

TableHeader.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
