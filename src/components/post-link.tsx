import React from 'react'
import { Link } from 'gatsby'

const PostLink = ({ post }: any) => (
  <div>
    <Link to={post.frontmatter.path}>
      <h5>
        {post.frontmatter.title} <br /> <small>{post.frontmatter.date}</small>
      </h5>
    </Link>
    <br />
  </div>
)

export default PostLink
