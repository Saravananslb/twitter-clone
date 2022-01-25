import React from "react";

import styles from "./button.module.css";

export const Button = ({ children, disabled, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
    >
      {children}
    </button>
  );
};
