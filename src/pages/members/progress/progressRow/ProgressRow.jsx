import PropTypes from 'prop-types';

export function ProgressRow({ userId, number, title, description, date, ...restProps }) {
  console.log(restProps);

  return (
    <tr>
      <td>{number}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{date}</td>
    </tr>
  );
}

ProgressRow.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
