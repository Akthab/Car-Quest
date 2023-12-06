export interface ICustomResponse {
	responseCode: string;
	responseMessage: string;
	responseData?: any;
}

class ResponseService {
	/**
	 * Method to return Response without Data
	 *
	 * @param responseCode
	 * @param responseMessage     Response Message
	 * @param responseData     Response Data (Can be Null also)
	 * @return Response Object without Data
	 */
	public respond = (
		responseCode: string,
		responseMessage: string,
		responseData?: any
	): ICustomResponse => {
		return responseData
			? {
					responseCode,
					responseMessage,
					responseData,
			  }
			: {
					responseCode,
					responseMessage,
			  };
	};
}

export default new ResponseService();
