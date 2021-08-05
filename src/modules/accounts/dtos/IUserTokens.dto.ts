interface IUserTokensDto {
  refreshToken: string;
  userId: string;
  expiresDate: Date;
}

export { IUserTokensDto }