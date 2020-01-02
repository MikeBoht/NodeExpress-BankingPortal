const express = require("express");
const router = express.Router();

const {accounts, writeJSON} = require("../data");

router.get('/transfer', function (req, res) {
    res.render("transfer");
});

router.post('/transfer', function (req, res) {
    const fromAcc = req.body.from;
    const toAcc = req.body.to;
    const amount = parseInt(req.body.amount);
    accounts[fromAcc].balance = parseInt(accounts[fromAcc].balance) - amount;
    accounts[toAcc].balance = parseInt(accounts[toAcc].balance) + amount;
    
    writeJSON();
    
    res.render("transfer", {message: "Transfer Completed"});
});

router.get('/payment', function (req, res) {
    res.render("payment", {account: accounts.credit});
});

router.post('/payment', function (req, res) {
    const amount = parseInt(req.body.amount);
    accounts.credit.balance = parseInt(accounts.credit.balance) - amount;
    accounts.credit.available = parseInt(accounts.credit.available) + amount;
    
    writeJSON();
    
    res.render("payment", {message: "Payment Successful", account: accounts.credit});
});

module.exports = router;