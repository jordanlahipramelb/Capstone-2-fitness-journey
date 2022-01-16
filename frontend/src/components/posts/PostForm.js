import React, { useState } from "react";

/** Reusable Post Edit Form Component
 *
 * Can be utilized to edit/add data.
 */

const PostForm = ({ save, post, cancel }) => {
  const [formData, setFormData] = useState({
    username: post.username,
    subject: post.subject,
    body: post.body,
    date: post.date,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    save(formData);
  };

  return (
    <div className="PostForm">
      <div className="card  mb-5">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
              <label htmlFor="subject">Subject: </label>
              <input
                className="form-control"
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body: </label>
              <textarea
                onChange={handleChange}
                id="body"
                name="body"
                className="form-control"
                rows={10}
                value={formData.body}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary container mt-2">
              Submit
            </button>
            <button
              onClick={cancel}
              className="btn btn-secondary container mt-1"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
