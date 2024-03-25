type User = {
  email: string;
  picture: string;
  mode: 'user' | 'seller';
};

export type userState = {
  user: User | null;
};

export type addUserPayload = {
  user: User;
};
