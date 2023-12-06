"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseService {
    /**
     * Method to return Response without Data
     *
     * @param responseCode
     * @param responseMessage     Response Message
     * @param responseData     Response Data (Can be Null also)
     * @return Response Object without Data
     */
    respond = (responseCode, responseMessage, responseData) => {
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
exports.default = new ResponseService();
