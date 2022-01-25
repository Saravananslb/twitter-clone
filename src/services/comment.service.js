import { API } from "./base";

import { cookies } from './auth.service';

export const AddComment = (comment) => {
  return fetch(`${API}/comment/add-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': cookies.get('authtoken')
    },
      body: JSON.stringify(comment)
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
