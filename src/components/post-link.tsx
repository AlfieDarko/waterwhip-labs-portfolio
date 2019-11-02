import React from "react";
import { Link } from "gatsby";

const PostLink = ({ post }: any) => (
  <div>
    <Link to={post.frontmatter.path}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
  </div>
);

export default PostLink;
