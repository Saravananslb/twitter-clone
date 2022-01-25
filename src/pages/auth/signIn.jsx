import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { signIn, cookies } from "../../services/auth.service";

import styles from "./auth.module.css";

export const SignIn = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('');

  const onClose = () => {
    navigate(-1);
  };

  const login = () => {
    signIn(user).then(data => {
      if (data.status) {
        cookies.set('authtoken', data.authToken);
        onClose();
      }
    })
  }

  return (
    <Modal enable={true} onClose={onClose}>
      <div className={styles.authContaienr}>
        <div className={styles.signInText}>Sign In</div>
        <div>
          <input type="text"
          className={styles.textBox}
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            className={styles.textBox}
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={login}>SignIn</Button>
        </div>
      </div>
    </Modal>
  );
};
