import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import LoginForm from "./LoginForm";
import { useCallback } from "react";

const emailValidation = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
};

function SignUpForm() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const LoginForm = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const localAccounts = localStorage.getItem("accounts");
    if (localAccounts) {
      setAccounts(JSON.parse(localAccounts));
    }
  }, []);

  const [emailValue, setEmailValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [accountNumberValue, setAccountNumberValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [errorCreate, setErrorCreate] = useState({
    isEmpty: false,
    isInvalidEmail: false,
    isInvalidAcctNo: false,
    isNameInvalid: false,
    isPasswordInvalid: false,
    isNotMatchingPass: false,
  });

  useEffect(() => {
    setErrorCreate({
      isEmpty: false,
      isInvalidEmail: false,
      isInvalidAcctNo: false,
      isNameInvalid: false,
      isPasswordInvalid: false,
      isNotMatchingPass: false,
    });

    if (emailValue === "") {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isEmpty: true,
        };
      });
    } else if (
      !emailValidation(emailValue) ||
      accounts.some((acct) => acct.email === emailValue)
    ) {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isInvalidEmail: true,
        };
      });
    } else if (
      isNaN(parseFloat(accountNumberValue)) ||
      `${accountNumberValue}`.length !== 9 ||
      accounts.some((acct) => acct.accountNumber === accountNumberValue)
    ) {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isInvalidAcctNo: true,
        };
      });
    } else if (`${passwordValue}`.length < 8) {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isPasswordInvalid: true,
        };
      });
    } else if (passwordValue !== confirmPasswordValue) {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isNotMatchingPass: true,
        };
      });
    } else {
      setErrorCreate({
        isEmpty: false,
        isInvalidEmail: false,
        isInvalidAcctNo: false,
        isNameInvalid: false,
        isPasswordInvalid: false,
        isNotMatchingPass: false,
      });
    }
  }, [
    emailValue,
    firstNameValue,
    accountNumberValue,
    passwordValue,
    confirmPasswordValue,
  ]);

  /* Getting the value of fields */
  function getEmailValue(email) {
    setEmailValue(email.target.value);
    emailValue = email.target.value;
  }
  function getFirstNameValue(firstName) {
    setFirstNameValue(firstName.target.value);
    firstNameValue = firstName.target.value;
  }
  function getAccountNumberValue(accountNumber) {
    setAccountNumberValue(accountNumber.target.value);
    accountNumberValue = accountNumber.target.value;
  }
  function getPasswordValue(password) {
    setPasswordValue(password.target.value);
    passwordValue = password.target.value;
  }
  function getConfirmPasswordValue(confirmPassword) {
    setConfirmPasswordValue(confirmPassword.target.value);
    confirmPasswordValue = confirmPassword.target.value;
  }

  /* Sign Up Button Function */
  const signUp = (e) => {
    e.preventDefault();

    const newAccount = {
      name: firstNameValue,
      email: emailValue,
      password: passwordValue,
      accountNumber: accountNumberValue,
      balance: "0",
      expiration: "12/26",
      isLoggedIn: false,
      isAdmin: false,
      transactions: [],
      wallets: [],
    };

    if (errorCreate.isEmpty) {
      alert("Empty fields");
    } else if (errorCreate.isInvalidAcctNo) {
      alert("Invalid account number!");
    } else if (errorCreate.isInvalidEmail) {
      alert("Invalid email!");
    } else if (errorCreate.isNameInvalid) {
      alert("Invalid Name!");
    } else if (errorCreate.isPasswordInvalid) {
      alert("Invalid password. Must have at least 8 characters.");
    } else if (errorCreate.isNotMatchingPass) {
      alert("Passwords do not match!");
    } else {
      localStorage.setItem(
        "accounts",
        JSON.stringify([...accounts, newAccount])
      );
      alert("Account ceated!");
      LoginForm();
    }
  };

  /*  
1. create array of accounts
2. state for fields in signup (account, email...)
3. create signUp button trigger
3.1 get all fields from state and add it to new account object
3.2 push account object to array of accounts
3.3 save array of accounts
*/

  return (
    <div>
      <form>
        <div className="form-inner">
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              autoFocus
              onChange={getFirstNameValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="account">Account Number: </label>
            <input
              type="text"
              name="account"
              id="account"
              autoComplete="off"
              onChange={getAccountNumberValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              onChange={getEmailValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              onChange={getPasswordValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm password: </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={getConfirmPasswordValue}
            />
          </div>
          <input type="submit" value="Sign Up" onClick={signUp} />
          <button className="logIn" onClick={LoginForm}>
            Already have an account? Log in!
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
