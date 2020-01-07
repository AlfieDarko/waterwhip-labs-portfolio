import React from "react";
import { graphql } from "gatsby";
import { PageProps } from "./types";
import { config, useSpring, animated } from "react-spring";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import styled from "styled-components";

const Article: React.FunctionComponent<PageProps> = ({ data }: any) => {
  const { markdownRemark, project, images } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  const categoryAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: "translate3d(0, -30px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" }
  });

  const titleAnimation = useSpring({
    config: config.slow,
    delay: 300,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  const descAnimation = useSpring({
    config: config.slow,
    delay: 600,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  const imagesAnimation = useSpring({
    config: config.slow,
    delay: 800,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  const BlogPostContainer = styled.div`
    text-align: left;
    max-width: 80vw;
    margin: 10rem;

    p > img {
      max-width: 50vw;
      margin-top: 3.5rem;
      margin-bottom: 3.5rem;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    p > code {
      background: #d3d3d385;
      padding: 0.2em;
    }

    pre {
      background: #d3d3d385;
      padding: 2rem;
    }
  `;

  return (
    <>
      <Layout color={"black"}>
        <SEO individual />
        <BlogPostContainer className="blog-post-container">
          <div className="blog-post">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </BlogPostContainer>
      </Layout>
    </>
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

export default Article;
