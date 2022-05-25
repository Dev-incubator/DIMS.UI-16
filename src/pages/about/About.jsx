import styles from './About.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';
import { InfoItem } from './infoItem/InfoItem';
import { infoItems } from './data/info';

export function About() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={`${styles.content} ${styles[theme]}`}>
          <div>
            <div className={styles.title}>Briefly</div>
            <div className={styles.info}>
              <span>
                In the few words, it is a system for getting tasks and tracking time. There are several user roles in
                the DIMS:
              </span>
              <div className={styles.indent}>
                <strong>Admin.</strong>
                <br />
                <strong>Mentor.</strong>
                <br />
                <strong>Member.</strong>
                <span>&nbsp;It&#39;s just like you:)</span>
                <br />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.title}>Common functionality</div>
            <div className={styles.info}>
              {infoItems.map((item, index) => (
                <InfoItem key={`${index.toString()}`} position={index + 1} text={item.text} imgSrc={item.imgSrc} />
              ))}
            </div>
          </div>
          <div>
            <div className={styles.title}>Conclusion</div>
            <div className={styles.info}>
              If you want to use app, contact us and we will send you link to register. After successful registration
              you can use all functionality I described above:)
              <br />
              <div className={styles.indent}>
                <span>
                  Developed by <strong>Oleg Yanusik</strong>
                </span>
                <br />
                <span>Contact me: olegyanusik@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
