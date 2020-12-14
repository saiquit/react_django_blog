import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Row } from "reactstrap";
import BlogList from "../components/BlogList";
import {
  fetchingBlogAsync,
  fetchingSuccess,
  startFetching,
} from "../redux/blog/actions";
import axios from "axios";
import SpinnerComp from "../components/Spinner";

const HomePage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const { blogs, loading, next_page, previous_page } = useSelector(
    (state) => state.blog,
  );
  useEffect(() => {
    dispatch(fetchingBlogAsync());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(startFetching());
    const { data } = await axios.get(`api/blogs/?search=${search}`);
    await dispatch(fetchingSuccess(data));
  };

  return (
    <>
      <Row className="w-100 p-4">
        <Col md={8}>
          {loading ? (
            <SpinnerComp />
          ) : !loading && blogs.length ? (
            <BlogList blogs={blogs} />
          ) : (
            <p>No Blogs</p>
          )}
          <Row className="w-100">
            {previous_page && (
              <Button
                onClick={() => dispatch(fetchingBlogAsync(previous_page))}
                className="btn-primary float-left"
              >
                Previous
              </Button>
            )}
            {next_page && (
              <Button
                onClick={() => dispatch(fetchingBlogAsync(next_page))}
                color="primary"
                className="float-right ml-auto"
              >
                Next
              </Button>
            )}
          </Row>
        </Col>
        <Col md={4}>
          <Card className="p-3 border-darken-1">
            <h2 className="h2">Search</h2>
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search this blog"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
