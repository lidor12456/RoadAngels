import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "./Register.css";

import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  const onChangeCity = (e) => {
    const city = e.target.value;
    setCity(city);
  };
  const onChangeRegion = (e) => {
    const region = e.target.value;
    setRegion(region);
  };

  const handleRegister = (e) => {
    // setIsLoading(true);

    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        username,
        email,
        password,
        name,
        phone,
        city,
        region
      ).then(
        (response) => {
          // setIsLoading(false);
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="rr-main col-md-12">
      {isLoading && <h1 className="spinner">Spinner</h1>}

      <div className="">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div className="form">
              <div className="rr form-group">
                {/* <div className="rr card mb-10"> */}
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                  />
                </div>
                {/* </div> */}
                {/* <div className="rr card mb-10"> */}
                <div className="form-group">
                  <label htmlFor="Phone">Phone</label>
                  <Input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={phone}
                    onChange={onChangePhone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="City">City</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="city"
                    value={city}
                    onChange={onChangeCity}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Region">Region</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="region"
                    value={region}
                    onChange={onChangeRegion}
                  />
                </div>

                {/* <div className="form-group"></div> */}
                {/* </div> */}
              </div>
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
