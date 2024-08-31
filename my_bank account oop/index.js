#! /usr/bin/env node
import inquirer from "inquirer";
//bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful. Remaining balance is $${this.balance}`);
        }
        else {
            console.log("insufficient balance");
        }
    }
    // credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charge if more than $100 deposited
        }
        this.balance += amount;
        console.log(`deposit of $${amount} successful. Remaining balance $${this.balance}.`);
    }
    // check balance
    checkBalance() {
        console.log(`current balance : $${this.balance}.`);
    }
}
// customer class
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobile, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobile;
        this.account = account;
    }
}
// create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// create customer 
const customers = [
    new customer("hina", "qureshi", "female", 20, 3314567345, accounts[0]),
    new customer("ayan", "zeeshan", "male", 22, 3004567345, accounts[1]),
    new customer("tooba", "qureshi", "female", 18, 3214567345, accounts[2])
];
// function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`welcome ${customer.firstName} ${customer.lastName}! \n`);
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "select an operation",
                choices: ["withdraw", "deposit", "checkBalance", "exit"]
            });
            switch (ans.select) {
                case "deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "enter your amount to deposits:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "enter your amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "checkBalance":
                    customer.account.checkBalance();
                    break;
                case "exit":
                    console.log("Exiting from bank program....");
                    console.log("\n Thank youfor using our Bank services... Have a great day...!");
                    return;
            }
        }
        else {
            console.log("invalid account number, please try again...!");
        }
    } while (true);
}
service();
