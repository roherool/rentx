interface IUserResponseDto {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  avatar_url(): string;
}

export { IUserResponseDto }