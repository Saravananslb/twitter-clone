import React from "react";

import styles from "./modal.module.css";

export const Modal = ({ children, enable, onClose }) => {
  return (
    <>
      {enable ? (
        <div className={styles.modalBody}>
          <div className={styles.modalChild}>
            <div onClick={onClose} className={styles.modalCloseButton}>
              x
            </div>
            {children}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
