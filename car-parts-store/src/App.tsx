import './styles/main.scss';
import Header from './components/Header/Header';
import useAppStore from './stores/appStore';
import Modal from './components/Modal/Modal';

const App = () => {
  const modals = useAppStore(it => it.modals);
  const currentModal = modals.length > 0 ? modals[modals.length - 1] : null;

  console.log(modals.length)

  return (
    <div className="App">
      <Header />
      {currentModal && (
        <div id='modal-container' className='modal-container'>
          <Modal>
            {currentModal}
          </Modal>
        </div>
      )}
    </div>
  );
}

export default App;
