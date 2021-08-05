interface IUserDto {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  isAdmin?: boolean;
}

export { IUserDto }