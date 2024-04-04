import { useState, useEffect } from "react";
import { registerUser } from "../api/serverAuth";

const Register = ({ isAutherized }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [authData, setAuthData] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) {
      console.log(isReady)
      console.log(formData)
      registerUser(formData).then((data) => setAuthData(data));
    }
  }, [isReady, formData, isAutherized]);

  const { name, email, password, confirmPassword } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      setIsReady(true);
      window.location.reload();
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Register"/>
        </div>
      </form>
    </div>
  );
};

export default Register;