
export const ResponseStatus = {
    SUCCESS:0,
    BAD_REQUEST:102,
    UNAUTHORIZED:103,
    INVALID_TOKEN:108,
    INTERNAL_SERVER_ERROR:500,
}

export const getResponseInternalServerError = () => {
    return {
        status:ResponseStatus.INTERNAL_SERVER_ERROR,
        message:"Internal Server Error", 
        data:null
    }
}

