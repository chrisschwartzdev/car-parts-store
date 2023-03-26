import { UserControl } from '../UserControl/UserControl';
import styles from './Header.module.scss';

const Header = () => {

  return (
    <div className={styles.header}>
      <span className={styles.title}>Car Parts Store</span>
      <div className={styles.right}>
        <UserControl />
      </div>
    </div>
  )
}

export default Header;