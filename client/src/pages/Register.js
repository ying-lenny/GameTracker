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
      registerUser(formData).then((data) => setAuthData(data));
    }
  }, [isReady, formData, isAutherized]);

  const { name, email, password, confirmPassword } = formData

  const onChange = (e) => {
    setFormData({ ...formData, })
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
            type=""
            name=""
            id=""
            value={name}
            placeholder=""
            onChange={onChange}
          />
          <input
            type=""
            name=""
            id=""
            value={email}
            placeholder=""
            onChange={onChange}
          />
          <input
            type=""
            name=""
            id=""
            value={password}
            placeholder=""
            onChange={onChange}
          />
          <input
            type=""
            name=""
            id=""
            value={confirmPassword}
            placeholder=""
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  )
}