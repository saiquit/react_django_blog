import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { NavLink as RouterNavLink, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/actions";

const NavigationBar = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [render, setRender] = useState(false);
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser(history));
    setRender(true);
    // window.location.reload();
  };
  useEffect(() => {
    return () => {};
  }, [render]);
  const authNav = () => (
    <>
      <NavItem>
        <RouterNavLink
          className="nav-link text-capitalize"
          activeClassName="active"
          to="/create"
        >
          <i
            data-toggle="tooltip"
            data-placement="bottom"
            title="Create A New Post"
            className="fas fa-plus-circle"
          ></i>
          {/* Create Post */}
        </RouterNavLink>
      </NavItem>
      <NavItem>
        <RouterNavLink
          className="nav-link text-capitalize"
          activeClassName="active"
          to="/profile"
        >
          {user.username}
        </RouterNavLink>
      </NavItem>
      <NavItem>
        <NavLink
          onClick={handleLogout}
          className="nav-link"
          style={{ cursor: "pointer" }}
        >
          Logout
        </NavLink>
      </NavItem>
    </>
  );

  const guestNav = () => (
    <>
      <NavItem>
        <RouterNavLink
          className="nav nav-pills nav-link"
          activeClassName="active"
          to="/login"
        >
          Sign in
        </RouterNavLink>
      </NavItem>
      <NavItem>
        <RouterNavLink
          className="nav-link"
          activeClassName="active"
          to="/signup"
        >
          Sign up
        </RouterNavLink>
      </NavItem>
    </>
  );

  const renderNav = () => {
    switch (true) {
      case !isAuthenticated && loading:
        return <p>Loading</p>;
      case !isAuthenticated && !loading:
        return guestNav();
      case isAuthenticated && !loading:
        return authNav();
      default:
        return guestNav();
    }
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <RouterNavLink
          className="nav-item text-decoration-none text-white h5"
          to="/"
        >
          {/* <NavbarBrand>Blog</NavbarBrand> */}
          Blog
        </RouterNavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {renderNav()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(NavigationBar);
