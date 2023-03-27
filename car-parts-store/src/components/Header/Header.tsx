import { Link, useLocation } from 'react-router-dom';
import { UserService } from '../../services/userService';
import useUserStore from '../../stores/userStore';
import { UserControl } from '../UserControl/UserControl';
import styles from './Header.module.scss';

const Header = () => {
  const user = useUserStore(it => it.user);
  const url = useLocation().pathname;

  const showActive = (urlMatch: string) => url === urlMatch ? styles.active : '';
  const showActiveContains = (urlMatch: string) => url.includes(urlMatch) ? styles.active : '';

  return (
    <div className={styles.header}>
      <span className={styles.title}>Car Parts Store</span>
      <div className={styles.nav}>
        <Link to='/home' className={showActive('/')}>Home</Link>
        <Link to='/store' className={showActive('/store')}>Store</Link>
        {UserService.isUserAdmin(user) && <Link to='/admin' className={showActiveContains('/admin')}>Admin</Link>}
      </div>
      <div className={styles.right}>
        <UserControl />
      </div>
    </div>
  )
}

export default Header;