// Selectors to select properties of the store
// Team Name
export const getTeamName = UWF.Store.createSelector(
  [state => state.team.name],
  teamName => {
    return teamName;
  }
);

// Team Members
export const getTeamMembers = UWF.Store.createSelector(
  [state => state.team.members],
  members => members
);

// Team member count
export const getTeamMemberCount = UWF.Store.createSelector(
  [state => state.team.members],
  members => members.length
);
