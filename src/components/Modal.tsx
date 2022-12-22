import { FC } from 'react';
import styles from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: FC<Props> = ({
  isOpen,
  onClose,
  title = 'Select a Token',
  children,
}) =>
  !isOpen ? null : (
    <div
      className={`${styles.modal} ${
        isOpen ? styles.open_modal : styles.close_modal
      }`}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
          <h1>{title}</h1>
        </div>
        <div className={styles.modalBody}>{children}</div>
        {/*<div className={styles.modalFooter}>
          <h3>Modal Footer</h3>
        </div>*/}
      </div>
    </div>
  );

export default Modal;
