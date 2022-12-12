import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const adminDetails = {
  name: "admin",
  email: "admin@bank.com",
  password: "12345",
  accountNumber: "000000001",
  balance: "1000000000",
  expiration: "12/99",
  isLoggedIn: false,
  isAdmin: true,
  transactions: [],
  wallets: [],
};

function LoginForm() {
  const [details, setDetails] = useState({ email: "", password: "" });

  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState([adminDetails]);
  const navigate = useNavigate();

  /* useEffect(()=>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
            navigate("/Dashboard")
           

        }
      }, [navigate,user]
      ) */

  useEffect(() => {
    if (accounts.length === 1) {
      const localAccounts = localStorage.getItem("accounts");

      if (localAccounts) {
        setAccounts(JSON.parse(localAccounts));
      } else {
        localStorage.setItem(
          "accounts",
          JSON.stringify(accounts)
        );
      }
    }
  }, [accounts]);

  const handleLogin = () => {
    let hasLoggedIn = false;
    let isAdmin = false;

    const updatedAccounts = accounts.map((account) => {
      if (
        details.email === account.email &&
        details.password === account.password
      ) {
        hasLoggedIn = true;
        const loggedInAccount = {
          ...account,
          isLoggedIn: true,
        };
        if (account.isAdmin) {
          isAdmin = true;
        }
        return loggedInAccount;
      } else {
        return account;
      }
    });

    if (hasLoggedIn) {
      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      if (isAdmin){
        navigate("/Admin")
      } else {
        navigate("/Dashboard");
      }
    } else {
      setError("Invalid email/password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    handleLogin(details);
  };

  function SignUpForm() {
    navigate("/SignUpForm");
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Login</h2>
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <input type="submit" value="Log in" onClick={handleLogin} />
          <button className="signUp" onClick={SignUpForm}>
            Don't have an account? Sign Up!
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
