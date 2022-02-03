import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FitnessJourney from "../../api";
import SearchForm from "../common/SearchForm";
import LoadingPage from "../common/LoadingPage";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState(null);

  /** Allows use of async search function */
  useEffect(function getPostsOnMount() {
    search();
  }, []);

  const search = async (subject) => {
    let posts = await FitnessJourney.getPosts(subject);

    setPosts(posts);
  };

  /** If no posts, return Loading component */
  if (!posts) return <LoadingPage />;
  /** If no posts and there are 0 posts in state */
  if (!posts && posts.length === 0) {
    return <h3 className="text-center">No posts present.</h3>;
  }

  return (
    <div className="PostList mb-5">
      <div className="col-md-8 offset-md-2">
        <div className="container">
          <section id="breadcrumb">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2>Forum</h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item past">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Forum
                  </li>
                </ol>
              </div>
            </nav>
          </section>

          <SearchForm searchFor={search} />
          <Link to="/forum/new">
            <button className="btn btn-secondary container mb-3">
              New Post
            </button>
          </Link>
          <section className="forum">
            {posts.length ? (
              <div className="PostList-list">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    subject={post.subject}
                    date={post.date}
                  />
                ))}
              </div>
            ) : (
              <h3 className="lead">No posts found.</h3>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostList;
