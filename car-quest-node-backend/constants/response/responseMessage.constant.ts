class ResponseMessage {
	// AUTH
	public static LOGIN_SUCCESS = 'Logged in successful';
	public static INVALID_CREDENTIALS = 'Invalid Credentials';
	public static NO_USER = 'User does not exist';
	public static NO_PASSWORD = 'Please define a password';
	public static AUTH_TOKEN_REQUIRED = 'Authorization token required';
	public static REQ_NOT_AUTHENTICATED = 'Request is not authenticated';

	// USER
	public static GET_USER_DETAILS_SUCCESS = 'Fetched User Details successful';

	//SERVER
	public static INTERNAL_SERVER_ERROR = 'Internal Server Error';
}

export default ResponseMessage;
