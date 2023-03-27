import './styles/main.scss';
import Header from './components/Header/Header';
import useAppStore from './stores/appStore';
import Modal from './components/Modal/Modal';
import InventoryManagement from './components/CRUD/Inventory/InventoryManagement';

const App = () => {
  const modals = useAppStore(it => it.modals);
  const currentModal = modals.length > 0 ? modals[modals.length - 1] : null;

  return (
    <div className="App">
      <Header />
      {currentModal && (
        <div id='modal-container' className='modal-container'>
          <Modal title={currentModal.props.title}>
            {currentModal.component}
          </Modal>
        </div>
      )}
      <InventoryManagement />
    </div>
  );
}

export default App;
