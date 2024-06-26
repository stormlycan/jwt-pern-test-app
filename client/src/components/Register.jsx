import React, { Fragment, useState } from "react";
import {Link} from 'react-router-dom'

function Register({ setAuth }) {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });


    const {email, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const body = {email, password, name};
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-type" : "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes =  await response.json();
            
            localStorage.setItem("token", parseRes.token);

            setAuth(true);
        } catch (err) {
            console.error(err.message); 
        }
    }

  return (
    <Fragment>
      <h1 className="text-center my-5" >Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={e => onChange(e)}
        />
        <input
          type="password"
          name="password"
          id="passwordInput"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={e => onChange(e)}
        />
        <input
          type="name"
          name="name"
          id="nameInput"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={e => onChange(e)}
        />
        <button type="submit" className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </Fragment>
  );
}

export default Register;
