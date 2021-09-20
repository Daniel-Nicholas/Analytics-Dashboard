// Actions

export const AddMember = payload => {
  return {
    type: 'ADD',
    payload
  };
};


export const DeleteMember = payload => {
    return {
      type: 'DELETE',
      payload
    };
  };
  