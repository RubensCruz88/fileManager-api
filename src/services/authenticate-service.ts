import { UsersRepository, User } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateServiceRequest {
	user: string,
	password: string
}

interface AuthenticateServiceReply {
	user: User
}

export class AuthenticateService {
	constructor(
		private usersRepository: UsersRepository
	){}

	execute({ user, password}: AuthenticateServiceRequest): AuthenticateServiceReply{
		const userReturned = this.usersRepository.findByUser(user);

		if(!userReturned){
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = (password === userReturned.password)

		if(!doesPasswordMatches){
			throw new InvalidCredentialsError()
		}

		return {user: userReturned}
	}
}