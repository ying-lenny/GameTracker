import { useState, useEffect } from "react"
import { loginUser } from "../api/serverAuth";
import { Link } from "react-router-dom";

const LoginPage = ({isAutherized}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) {
      loginUser(formData);
      setIsReady(false);
    }
  }, [isReady, formData, isAutherized]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsReady(true);
    window.location.reload();
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
          />
        </div>
        <div>
          <input type="submit" value="Login"/>
        </div>
        <h3>New User? Click <Link to={"/register"}>here to create an account</Link></h3>
      </form>
    </div>
  )
}

export default LoginPage