import React from "react";

import styles from "./imageOverlay.module.css";

export const ImageOverlay = ({ children, enable, onClose }) => {
  return (
    <>
      {enable ? (
        <div className={styles.imageOverlay}>
          <div onClick={onClose} className={styles.overlayClose}>
            x
          </div>
          {children}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
