/**
 * Mocking client-server processing
 */
const TIMEOUT = 6000;

export const api = {
  deleteUser(user) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Object.keys(user.email)) {
          resolve(user);
        } else {
          reject(`User has no email property to request delete`);
        }
      }, TIMEOUT),
    );
  },
  addUser(user) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Object.keys(user.email)) {
          resolve(user);
        } else {
          reject(`User has no email property to request add`);
        }
      }, TIMEOUT),
    );
  },
};
