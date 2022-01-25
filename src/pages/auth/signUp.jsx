import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { signUp } from "../../services/auth.service";

import styles from "./auth.module.css";

export const SignUp = () => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  const [user, setUser] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const [error, setError] = React.useState('');

  const createUser = () => {
    signUp(user).then(data => {
      if (data.status) onClose();
      else setError(data.message);
    });
  }

  return (
    <Modal enable={true} onClose={onClose}>
      <div className={styles.authContaienr}>
        <div className={styles.signInText}>Sign Up</div>
        <div>
          <input type="text" className={styles.textBox} placeholder="Name" 
          onChange={(e) => setUser({ ...user, name: e.target.value })} />
        </div>
        <div>
          <input type="text" className={styles.textBox} placeholder="Email" 
          onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </div>
        <div>
          <input
            type="password"
            className={styles.textBox}
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            className={styles.textBox}
            placeholder="Confirm Password"
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          />
        </div>
        <div>
        {error}
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={createUser} disabled={user.password !== user.confirmPassword || !user.name} >SignUp</Button>
        </div>
      </div>
    </Modal>
  );
};
