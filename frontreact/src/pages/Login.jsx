import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { loginUser } from "../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";

function Login({ history }) {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    await dispatch(loginUser(user, history));
    // history.push('/')
  };
  useEffect(() => {
    isAuthenticated && history.push("/");
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <div
      style={{ height: "70vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Form onSubmit={handleSubmit} style={{ width: "500px" }}>
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
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default Login;
