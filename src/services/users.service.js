import localforage from 'localforage';
import userdata from '../assets/users.json';

export const userService = {
  get,
  update,
};


function get() {
  return localforage.getItem('users')
    .then(res => {
      if (!res) {
        console.log('data not found')
        return localforage.setItem('users', userdata)
          .then(output => {
            return output;
          });
      }
      return res;
    })
}


function update(data) {
  return localforage.getItem('users')
  .then(res => {
    if (!res) {
      return localforage.setItem('users', userdata)
        .then(output => {
          return output;
        });
    }
    if (res && res.length > 0) {
      if (data) {
        return localforage.setItem('users', data)
          .then(output => {
            return output;
          });
      }
      return res;
    }
  })
}


