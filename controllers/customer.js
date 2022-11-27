const customerModel = require("../models/customer");
const addressModel = require("../models/address");
const customerValidator = require("../validators/customer")

const { v4: uuidv4 } = require('uuid');


const insertCustomer = (data) => {
    
    const { userName, firstName, lastName,
        dob, phone, email, gender, image, password,
        confirmPassword, address,landmark, country, state,
        city, zipcode } = data;
        
        // this will create a new unique customer id

    const customerId = uuidv4();
          
        // this will create a new unique address id

    const addressId = uuidv4();

    const customer = customerModel.create({ customerId, userName, firstName, lastName, dob, phone, email, gender, image, password, confirmPassword })
    const customerAddress = addressModel.create({ addressId, customerId, address, country, landmark,state, city, zipcode })
    return Promise.all([customer, customerAddress])
}

const getCustomers = (data) => {
    const query = []

    const skip = (parseInt(data?.limit) && Number(data?.page)) ? Number(data?.limit) * Number((data?.page) - 1) : 0;
    const limit = (Number(data?.limit)) || 20;

    if (data?.search) {
        query.push(
            {
                $match: {
                    $or: [
                        { firstName: data?.search },
                        { lastName: data?.search },
                        { email: data?.search },
                        { userName: data?.search }
                    ]
                }

            }
        )
    }

    if (data?.sortby) {
        const dataSort = {};
        dataSort[data?.sortby] = Number(data.order) || 1

        query.push(
            {
                $sort: dataSort
            }
        )
    }

    if (data?.customerId) {
        query.push(
            {
                $match: {
                    customerId: data?.customerId
                }
            }
        )
    }

    query.push(
        {
            $lookup: {
                from: "addresses",
                localField: "customerId",
                foreignField: "customerId",
                as: "addressData"
            }


        },
        {
            $unwind: "$addressData"
        },
        {
            //1 == get ; 0 == left
            $project: {
                "customerId": 1,
                "userName": 1,
                "firstName": 1,
                "lastName": 1,
                "dob": 1,
                "phone": 1,
                "email": 1,
                "gender": 1,
                "image": 1,
                "address": "$addressData.address",
                "state": "$addressData.state",
                "landmark":"$addressData.landmark",
                "country": "$addressData.country",
                "city": "$addressData.city",
                "zipcode": "$addressData.zipcode"

            }
        },
        
        {
            $skip: skip

        },
        {
            $limit: limit
        }

    )
    return customerModel.aggregate(query)
}

const deleteCustomer = (customerId) => {
    return customerModel.findOneAndDelete({
        customerId: customerId
    }).then(result => {
       return addressModel.findOneAndDelete({ customerId: customerId })
    }).catch(error => { throw error })
}


const updateCustomer = (data) => {
    const { userName, firstName, lastName,
        dob, phone, email, gender, image, password,
        confirmPassword, address, landmark, country, state,
        city, zipcode, customerId } = data; 
    return customerModel.findOneAndUpdate({
        customerId: customerId
    },
        {
            userName, firstName, lastName,
            dob, phone, email, gender, image,
            password, confirmPassword
        }
    ).then(result => {
        return addressModel.findOneAndUpdate({ customerId: customerId }, {
            address,
            country, state, landmark,
            city, zipcode
        })
    }).catch(error => { throw error })
}


module.exports = { insertCustomer, getCustomers, deleteCustomer, updateCustomer };