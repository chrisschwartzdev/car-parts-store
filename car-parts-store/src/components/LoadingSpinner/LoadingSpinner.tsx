import { combineClasses } from '../../utils';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <i className={combineClasses(styles.spinner, 'fa fa-spinner')} />
    </div>
  )
}

export default LoadingSpinner;