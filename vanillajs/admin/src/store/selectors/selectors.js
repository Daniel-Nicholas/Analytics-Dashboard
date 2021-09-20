// Selectors to select properties of the store
// User Count
export const getUserCount = UWF.Store.createSelector(
  [state => state.users],
  users => users.length
);
