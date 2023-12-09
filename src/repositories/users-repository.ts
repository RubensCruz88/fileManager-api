export interface User {
	user: string,
	password: string
}

export interface UsersRepository {
	findByUser(user: string): User | null 
}