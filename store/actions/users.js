export const SIGN_IN = 'SIGN_IN';
export const UPDATE = 'UPDATE';
export const addUser = (user) => {
  return { type: SIGN_IN, user: user };
};

export const updatePhoto = (image) => {
  return { type: UPDATE, image: image };
};
