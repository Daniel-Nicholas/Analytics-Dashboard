// Mock the UWF Object
// @ts-ignore
global.UWF = {
  API: {
    Notification: {
      init: jest.fn(),
    },
  },
  Store: {
    createSelector: jest.fn(),
  },
};
