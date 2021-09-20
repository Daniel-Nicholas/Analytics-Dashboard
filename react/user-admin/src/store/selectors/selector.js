// Selectors to select properties of the store
const UWF = window.UWF;

const usersSelector = (state) => state.users;

export const getUserCount = UWF.Store.createSelector(
  usersSelector,
  (users) => users.length,
);
