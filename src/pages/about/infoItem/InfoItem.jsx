import PropTypes from 'prop-types';
import styles from '../About.module.css';

export const InfoItem = ({ text, imgSrc, position }) => {
  return (
    <div className={styles.item}>
      <span>
        {position}.&nbsp;{text}
      </span>
      <img src={imgSrc} alt={imgSrc} />
    </div>
  );
};

InfoItem.propTypes = {
  text: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};
