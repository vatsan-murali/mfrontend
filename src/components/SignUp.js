import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const [user, setUser] = useState({
    username: "",
    phone: "",
    password: "",
    cpassword: "",
    otp: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone } = user;
    const phoneRegex = /^\d{10}$/; // regular expression to match a 10-digit phone number
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // regular expression to match an email address

    let recipient;
    console.log(otpSent,isVerified)
    if (phoneRegex.test(phone)) {
      console.log('in phoneregex')
      recipient = `+91${phone}`;
      console.log(recipient)
      if (isVerified) {
        const { username, phone, password, cpassword } = user;
        const res = await fetch("https://malaria-backend.onrender.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            phone,
            password,
            cpassword,
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("INVALID");
          setError(data.error);
        } else {
          console.log("REGISTERED SUCCESSFULLY!");
          setError(null);
          navigate("/");
          window.alert(data.message);
        }
      } else if (otpSent) {
        // Verify OTP
        const { otp, phone, username } = user;
        try {
          const res = await fetch("https://malaria-backend.onrender.com/verifyOTP", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipient, otp, phone, username }),
          });
          const data = await res.json();
          if (res.status === 404) {
            setError(data.error);
          } else {
            setError("");
            setIsVerified(true);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        const { username, phone } = user;

        // Send OTP to phone number
        try {
          const res = await fetch("https://malaria-backend.onrender.com/sendOTP", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, recipient, phone }),
          });
          const data = await res.json();
          console.log(res);
          console.log(data);
          if (res.status === 422 || !data) {
            console.log("INVALID");
            setError(data.error);
          } else {
            setOtpSent(true);
            setError("");
            console.log("OTP SENT!");
          }
        } catch (e) {
          console.log(e);
        }
      }
    } else if (emailRegex.test(phone)) {
      recipient = phone;
      if (isVerified) {
        const { username, phone, password, cpassword } = user;
        const res = await fetch("https://malaria-backend.onrender.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            phone,
            password,
            cpassword,
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("INVALID");
          setError(data.error);
        } else {
          console.log("REGISTERED SUCCESSFULLY!");
          setError(null);
          navigate("/");
          window.alert(data.message);
        }
      } else if (otpSent) {
        // Verify OTP
        const { otp, phone } = user;
        try {
          const res = await fetch("https://malaria-backend.onrender.com/verifyOTP", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipient, otp, phone }),
          });
          const data = await res.json();
          if (res.status === 404) {
            setError(data.error);
          } else {
            setError("");
            setIsVerified(true);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const {username} = user
          console.log('inside sendotp')
          const res = await fetch("https://malaria-backend.onrender.com/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipient, username, phone })
          });
          const data = await res.json();
          console.log(data)
          console.log(res)
          if (res.status === 500) {
            setError(data.error);
          } else {
            setOtpSent(true);
            setError("");
            console.log("OTP SENT!");
          }
        } catch (error) {
          console.log(error);
        }
      }
      console.log('hi')
    } else {
      setError("Invalid Input");
    }
  };
  return (
    <div className="row mt-2">
      <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-xs-12">
        <h1>Please Sign Up</h1>

        <p>
          Already have an account? Then please
          <Link to="/login"> log in</Link>.
        </p>

        <input type="hidden" />
        <div id="div_id_phone" className="mb-3">
          <label for="id_phone" className="form-label requiredField">
            Phone no./ Email*
          </label>
          <div>
            <input
              onChange={handleInput}
              name="phone"
              value={user.phone}
              type="text"
              placeholder="Phone number or Email"
              autoComplete="phone"
              className="textinput textInput form-control"
              required=""
              id="id_phone"
            />
          </div>
        </div>
        <div id="div_id_username">
          <label for="id_username" className="form-label requiredField">
            Username*
          </label>
          <div>
            <input
              onChange={handleInput}
              name="username"
              value={user.username}
              type="text"
              placeholder="Username"
              autoComplete="username"
              minLength="1"
              maxLength="150"
              className="textinput textInput form-control"
              required=""
              id="id_username"
            />
          </div>
        </div>
        {isVerified && (
          <>
            <div id="div_id_password" className="mb-3">
              <label for="id_password" className="form-label requiredField">
                Password*
              </label>
              <div>
                <input
                  onChange={handleInput}
                  name="password"
                  value={user.password}
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  className="textinput textInput form-control"
                  required=""
                  id="id_password"
                />
              </div>
            </div>
            <div id="div_id_cpassword" className="mb-1">
              <label for="id_cpassword" className="form-label requiredField">
                Password (again)*
              </label>
              <div>
                <input
                  onChange={handleInput}
                  name="cpassword"
                  value={user.cpassword}
                  type="password"
                  placeholder="Password (again)"
                  className="textinput textInput form-control"
                  required=""
                  id="id_cpassword"
                />
              </div>
            </div>
          </>
        )}

        {/* {error && <div className="text-danger mb-2">{error}</div>} */}

        {otpSent && (
          <>
            <label>
              OTP :
              <input
                className="mt-2"
                type="text"
                name="otp"
                value={user.otp}
                onChange={handleInput}
              />
            </label>
            <br />
          </>
        )}
        {error && <div className="text-danger mb-2">{error}</div>}
        <br />
        <input
          onClick={handleSubmit}
          className="btn btn-primary"
          value={isVerified ? "Signup" : otpSent ? "Verify OTP" : "Send OTP"}
        />
      </div>
    </div>
  );
};

export default SignUp;
