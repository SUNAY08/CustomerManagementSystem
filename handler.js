function successHandler(res, code, message, data) {
    const response = {
        statusCode: code,
        message: message,
    }
    if (data) response.data = data;
    res.send(response)
}

function errorHandler(res, code, message, error) {
    const response = {
        statusCode: code,
        message: message,
    }
    if (error) response.error = error;
    res.send(response);
}



module.exports = { successHandler, errorHandler };