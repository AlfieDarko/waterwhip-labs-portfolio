import React from "react";
import { graphql } from "gatsby";

const Talk: any = ({ data }: any) => {
  const { markdownRemark, project, images } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  return (
    <div className="talk-container">
      <div className="talk-video">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="talk-video-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;

export default Talk;
