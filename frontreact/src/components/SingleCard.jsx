import React from "react";
import moment from "moment";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";
import { Link } from "react-router-dom";

const SingleCard = ({ blog }) => {
  return (
    <Card className="mb-3 w-100">
      <Row className="g-0">
        <Col
          md={4}
          style={{
            height: 300,
            width: 200,
            backgroundImage: `url(${blog.thumbnile})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* <CardImg top height="100%" width="100%" src={blog.thumbnile} alt="Card image cap" /> */}
        </Col>
        <Col md={8}>
          <CardBody className="card-body">
            <CardTitle className="card-title h2">
              <Link
                to={{
                  pathname: `/posts/${blog.slug}`,
                  // state: { detail: blog },
                }}
                className="text-decoration-none text-dark"
              >
                {blog.title}
              </Link>
            </CardTitle>
            <CardText className="card-text">
              {blog?.content.length >= 350
                ? blog?.content.substr(0, 350) + "..."
                : blog?.content}
            </CardText>
            <CardText className="card-text">
              <small className="text-muted">
                {moment(blog.created_on).fromNow()}
              </small>
            </CardText>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default SingleCard;
