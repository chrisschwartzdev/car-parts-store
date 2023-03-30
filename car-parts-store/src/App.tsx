import './styles/main.scss';
import Header from './components/Header/Header';
import useAppStore from './stores/appStore';
import Modal from './components/Modal/Modal';
import InventoryManagement from './components/CRUD/Inventory/InventoryManagement';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Home from './pages/Home';
import Store from './pages/Store/Store';
import useUserStore from './stores/userStore';
import { UserService } from './services/userService';
import StoreResetter from './components/utils/StoreResetter';

const App = () => {
  const modals = useAppStore(it => it.modals);
  const currentModal = modals.length > 0 ? modals[modals.length - 1] : null;
  const user = useUserStore(it => it.user);

  return (
    <BrowserRouter>
      <StoreResetter />
      <Header />
      {currentModal && (
        <div id='modal-container' className='modal-container'>
          <Modal title={currentModal.props.title}>
            {currentModal.component}
          </Modal>
        </div>
      )}
      <div className='content'>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
          </Route>
          {UserService.isUserAdmin(user) && <Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/inventory" element={<InventoryManagement />} />
          </Route>}
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
