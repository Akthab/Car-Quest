export default class UserDetailsResponse {
	private id: any;
	private firstName: any;
	private lastName: any;
	private email: any;
	private phoneNumber: any;

	constructor(
		id: any,
		firstName: any,
		lastName: any,
		email: any,
		phoneNumber: any
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phoneNumber = phoneNumber;
	}
}
