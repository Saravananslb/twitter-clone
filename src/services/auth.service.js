import { API, IS_MOCK } from "./base";

import Cookies from 'universal-cookie';
export const cookies = new Cookies();

export const signIn = (user) => {
  return fetch(`${API}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(user)
  }).then(data => data.json());
};

export const signUp = (user) => {
    return fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(data => data.json());
  };
