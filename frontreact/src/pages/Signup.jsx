import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useSelector } from "react-redux";
import Axios from "axios";

function SignUp({ history }) {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password2, setPassword2] = useState(undefined);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      password2,
    };
    try {
      const { data } = await Axios.post("/api/accounts/sign-up/", user);
      data?.error ? alert(data?.error) : history.push("/login");
    } catch (error) {
      alert(error.response.message);
    }
  };
  useEffect(() => {
    isAuthenticated && history.push("/");
    return () => {
      setEmail("");
      setPassword("");
      setUsername("");
      setPassword2("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <div
      style={{ height: "70vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Form onSubmit={handleSubmit} style={{ width: "500px" }}>
        <FormGroup className="mb-5 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-5 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">User Name</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="mb-3"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="don't tell!"
            className="mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Confirm Password</Label>
          <Input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm"
            className="mb-3"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default SignUp;
