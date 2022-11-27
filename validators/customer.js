const handler = require("../handler")
const customerModel = require("../models/customer")

    // Validation for Customer Data

module.exports.validateCustomerData = (inputData) => {
    const error = [];
    console.log(inputData," check")
    if (!inputData.userName) error.push({
        fieldName: "userName",
        message: "userName can't be empty"
    });
    if (!inputData.firstName) error.push({
        fieldName: "firstName",
        message: "firstName can't be empty"
    });
    if (!inputData.lastName) error.push({
        fieldName: "laststName",
        message: "laststName can't be empty"
    });
    if (!inputData.password) error.push({
        fieldName: "password",
        message: "password can't be empty"
    });
    if (!inputData.confirmPassword) error.push({
        fieldName: "confirmPassword",
        message: "confirmPassword can't be empty"
    });
    if (!inputData.address) error.push({
        fieldName: "address",
        message: "address can't be empty"
    });
    if (!inputData.country) error.push({
        fieldName: "country",
        message: "country can't be empty"
    });
    if (!inputData.state) error.push({
        fieldName: "state",
        message: "state can't be empty"
    });
    if (!inputData.city) error.push({
        fieldName: "city",
        message: "city can't be empty"
    });
    if (!inputData.zipcode) error.push({
        fieldName: "zipcode",
        message: "zipcode can't be empty"
    });
    return error;
}

    //Validation for Customer Id

module.exports.validateCustomerId = (inputData) => {
    const error = []
    if (!inputData?.customerId) {
        error.push({
            fieldName: "customerId",
            message: "customerId cant be empty"
        })

    } return error;
}