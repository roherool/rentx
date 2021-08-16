import { AppError } from "@shared/errors/AppError"
import { DayjsDateProvider } from "@shared/providers/DateProvider/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/providers/in-memory/MailProviderInMemory"
import { UserRepositoryInMemory } from "@modules/accounts/iRepositories/in-memory/UserRepositoryInMemory"
import { UserTokensRepositoryInMemory } from "@modules/accounts/iRepositories/in-memory/UserTokensRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMail.useCase"

let userRepositoryInMemory: UserRepositoryInMemory
let userTokenRepositoryInMemory: UserTokensRepositoryInMemory
let sendForgotPasswordMailService: SendForgotPasswordMailUseCase
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory


describe('Send Forgot Mail', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    userTokenRepositoryInMemory = new UserTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailService = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider,
      mailProvider,
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    await userRepositoryInMemory.create({
      name: 'John Doe',
      email: 'johndoe@fakemail.com',
      password: '123456'
    })

    await sendForgotPasswordMailService.execute('johndoe@fakemail.com')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailService.execute('doejohn@fakemail.com')
    ).rejects.toEqual(new AppError('User does not exists!'))
  })

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(userTokenRepositoryInMemory, 'create')

    await userRepositoryInMemory.create({
      name: 'Mary Doe',
      email: 'marydoe@fakemail.com',
      password: '123456'
    })

    await sendForgotPasswordMailService.execute('marydoe@fakemail.com')

    expect(generateTokenMail).toBeCalled()
  })
})