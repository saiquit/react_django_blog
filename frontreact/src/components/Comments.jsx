import React from "react";
import SingleComments from "./SingleComments";

const Comments = ({ handleSubmit, setTitle, comments, hidden }) => {
  return (
    <div>
      <div className="container">
        <form className="mb-5" onSubmit={handleSubmit} hidden={!hidden}>
          <div className="form-group">
            <label className="h3">Comments</label>
            <textarea
              rows="5"
              className="form-control"
              name="description"
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>
          <button className="btn btn-primary float-right">Comment</button>
          <div className="form-group"></div>
        </form>
        <div className="mt-5 border border-darken-2 p-4">
          {comments &&
            comments.map((comment) => (
              <SingleComments comment={comment} key={comment.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
