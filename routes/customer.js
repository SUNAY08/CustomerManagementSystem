const express = require("express");
const router = express.Router();
const handler = require("../handler")
const customerValidator = require("../validators/customer")

const customerController = require("../controllers/customer");


router.post('/insertCustomer', (req, res) => {
  const error = [];
  error.push(...customerValidator.validateCustomerData(req.body))
  


  customerController.insertCustomer(req.body).then(result => {
    handler.successHandler(res, 201, "success", result);
  }).catch(error => {
    handler.errorHandler(res, 400, "INVALID DATA", error);
  })
})

router.get('/selectCustomers', (req, res) => {
  customerController.getCustomers(req.query).then(result => {
    handler.successHandler(res, 200, "success", result);

  }).catch(error => {
    handler.errorHandler(res, 400, "Something Went Wrong Try Again Later", error);
  })
})

router.post("/selectCustomerById", (req, res) => {
  let error = [];
  error = customerValidator.validateCustomerId(req.body)
  if (error.length > 0) return handler.errorHandler(res, 400, "Validation Error", error);

  customerController.getCustomers(req.body).then(result => {
    handler.successHandler(res, 200, "success", result);

  }).catch(error => {
    handler.errorHandler(res, 400, "Something Went Wrong Try Again Later", error);
  })
})

router.post('/updateCustomer', (req, res) => {
  let error = [];
  error.push(...customerValidator.validateCustomerId(req.body), ...customerValidator.validateCustomerData(req.body))
  if (error.length > 0) return handler.errorHandler(res, 400, "Validation Error", error);

  customerController.updateCustomer(req.body).then(result => {
    handler.successHandler(res, 200, "success");
  }).catch(error => {
    handler.errorHandler(res, 400, "Something Went Wrong Try Again Later", error);
  })
})


router.post('/deleteCustomer', (req, res) => {
  let error = [];
  error.push(...customerValidator.validateCustomerId(req.body));
  if (error.length > 0) return handler.errorHandler(res, 400, "Validation Error", error);

  customerController.deleteCustomer(req.body.customerId).then(result => {
    handler.successHandler(res, 200, "success");

  }).catch(error => {
    handler.errorHandler(res, 400, "Something Went Wrong Try Again Later", error);
  })
})

module.exports = router;

