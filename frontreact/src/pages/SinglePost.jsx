import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Comments from "../components/Comments";
import { useSelector } from "react-redux";
import { Badge } from "reactstrap";

const SinglePost = ({ match }) => {
  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // console.log(user);
  const fetchBlog = async () => {
    const { data } = await axios.get(`/api/blogs/${match.params.slug}`);
    setBlog(data);
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      post: blog.id,
      author: user.id,
      title,
    };
    try {
      const { data } = await axios.post("/api/comments/", comment);
      setBlog((prevData) => {
        const newComments = {
          ...prevData,
          comments: [...prevData.comments, data],
        };
        return newComments;
      });
      setTitle("");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchBlog();
    return () => {
      setBlog(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="main-wrapper">
        <article className="blog-post px-3 py-5 p-md-5">
          <div className="container">
            <header className="blog-post-header">
              <h2 className="title mb-2">{blog?.title}</h2>
              <div className="meta mb-3">
                <span className="date">
                  Published {moment(blog?.created_on).fromNow() || ""}
                </span>
                {/* <span className="time">5 min read</span> */}
                <span className="comment pl-2 text-primary">
                  {blog?.comments?.length} comments
                </span>
              </div>
            </header>

            <div className="blog-post-body">
              <figure className="blog-banner">
                <img
                  className="img-fluid"
                  src={blog?.thumbnile || ""}
                  alt={blog?.title}
                />
              </figure>
              <p>{blog?.content}</p>
            </div>
            <h3>
              {blog?.category &&
                blog?.category.map((cate) => (
                  <Badge key={cate.id}>{cate?.title}</Badge>
                ))}
            </h3>
          </div>
        </article>
      </div>
      <Comments
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        comments={blog?.comments}
        hidden={isAuthenticated}
      />
    </>
  );
};

export default SinglePost;
