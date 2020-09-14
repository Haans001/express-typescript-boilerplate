export default interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  isActive?: boolean;
}

export interface IUserInputDTO {
  userName: string;
  email: string;
  password: string;
}
