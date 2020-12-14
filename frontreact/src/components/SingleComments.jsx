import React from "react";
import moment from "moment";

const SingleComments = ({ comment }) => {
  return (
    <div className="my-4">
      <p className="m-0 p-0 h5">
        {comment.title}{" "}
        <span>
          <sup className="badge badge-primary">{comment.author}</sup>
        </span>{" "}
      </p>
      <p className="text-muted m-0 p-0">
        {moment(comment.created_at).fromNow()}
      </p>
      <hr />
    </div>
  );
};

export default SingleComments;
