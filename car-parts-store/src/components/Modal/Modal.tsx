import { PropsWithChildren } from "react";
import useAppStore from "../../stores/appStore";
import styles from './Modal.module.scss';

interface ModalProps extends PropsWithChildren<any> {

}

const Modal = (props: ModalProps) => {
  const popModal = useAppStore(state => state.popModal);

  return (
    <div className={styles.modal}>
      <div className={styles.handle}>
        <button className={`icon-btn ${styles.closeButton}`} onClick={() => popModal()}><i className='fa fa-times' /></button>
      </div>
      {props.children}
    </div>
  )
}

export default Modal;