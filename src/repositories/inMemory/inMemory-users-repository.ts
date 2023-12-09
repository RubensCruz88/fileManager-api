import { UsersRepository, User} from '@/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [{
		user: 'admin',
		password: 'admin'
	}]

	findByUser(user: string) {
		const userReturned = this.users.find(item => item.user === user);

		if(!userReturned){
			return null
		}

		return userReturned
	}
}