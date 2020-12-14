import React from "react";
import { useSelector } from "react-redux";
import SingleCard from "../components/SingleCard";
import { Col, Row } from "reactstrap";
const ProfilePage = () => {
  const {
    user: { blogs },
  } = useSelector((state) => state.auth);

  return (
    <>
      <h3 className="text-center display-2">MY POST's</h3>
      <Row className="w-100 p-4 d-flex justify-content-center m-0">
        {blogs &&
          blogs.map((blog, idx) => (
            <Col md={6} key={idx} className="">
              <SingleCard blog={blog} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default ProfilePage;
