import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Input, Row } from "reactstrap";
import { addBlogToUser } from "../redux/auth/actions";

const CreateBlog = ({ history }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data } = await axios.get("/api/categories/");
    setCategories(data);
  };

  const handleCat = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(parseInt(options[i].value));
      }
    }
    setCategory(value);
  };

  useEffect(() => {
    getCategories();
    return () => {};
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let post = new FormData();
    post.append("title", title);
    post.append("thumbnile", image, image.name);
    post.append("content", content);
    post.append("category", category);
    const { data } = await axios.post("api/blogs/create/", post, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    dispatch(addBlogToUser(data));
    history.push("/profile");
  };

  return (
    <Row className="p-0 m-0">
      <Col md={6} className="p-3">
        <header className="blog-post-header">
          <h2 className="title mb-2">{title}</h2>
        </header>
        <div className="blog-post-body">
          <figure className="blog-banner">
            <img
              className="img-fluid w-75"
              src={image ? URL.createObjectURL(image) : null}
              alt={image ? image.name : null}
            />
          </figure>
          <p>{content}</p>
        </div>
      </Col>
      <Col md={6}>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h1>Create post</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Title <span className="require">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group border-0">
                <label>
                  Image <span className="require">*</span>
                </label>
                <Input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  className="form-control border-0"
                  name="image"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="5"
                  className="form-control"
                  name="description"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Categories</label>
                <select
                  onChange={handleCat}
                  className="custom-select custom-select-sm"
                  multiple
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
                <button className="btn btn-default">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CreateBlog;
