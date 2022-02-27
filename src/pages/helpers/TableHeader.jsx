import PropTypes from 'prop-types';
import pageStyles from '../members/MemberPage.module.css';

export function TableHeader({ titles }) {
  return (
    <thead>
      <tr>
        {titles.map((title, index) => (
          <th key={title + index.toString()} className={pageStyles.tableTitle}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
