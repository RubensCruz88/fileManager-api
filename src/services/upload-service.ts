import { UsersRepository, User } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface UploadServiceRequest {
	user: string,
	password: string
}

interface UploadServiceReply {
	user: User
}

export class UploadService {
	constructor(
		private usersRepository: UsersRepository
	){}

	execute({ user, password}: UploadServiceRequest): UploadServiceReply{
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