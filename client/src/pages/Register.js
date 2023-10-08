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
  })
}