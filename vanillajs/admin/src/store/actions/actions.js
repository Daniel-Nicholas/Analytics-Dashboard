// Actions
export const AddUser = payload => {
  return {
    type: "ADD",
    payload
  };
};

export const UpdateUser = payload => {
  return {
    type: "UPDATE",
    payload
  };
};

export const DeleteUser = payload => {
  return {
    type: "DELETE",
    payload
  };
};
