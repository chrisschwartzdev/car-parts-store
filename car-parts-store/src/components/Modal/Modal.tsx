import { PropsWithChildren } from "react";
import useAppStore from "../../stores/appStore";
import styles from './Modal.module.scss';

interface ModalProps extends PropsWithChildren<any> {
  title: string;
}

export interface ModalComponent {
  props: ModalProps;
  component: JSX.Element
}


const Modal = ({ title, children }: ModalProps) => {
  const popModal = useAppStore(state => state.popModal);

  return (
    <div className={styles.modal}>
      <div className={styles.handle}>
        <h2>{title}</h2>
        <button className={`icon-btn ${styles.closeButton}`} onClick={() => popModal()}><i className='fa fa-times' /></button>
      </div>
      {children}
    </div>
  )
}

export default Modal;