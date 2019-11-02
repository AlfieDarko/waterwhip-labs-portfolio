import React from "react";
import { graphql } from "gatsby";
import PostLink from "../components/post-link";
import Img from "gatsby-image";
import { transparentize, readableColor } from "polished";
import styled from "styled-components";
import { config, useSpring, animated } from "react-spring";
import Layout from "../components/layout";
import { Box, AnimatedBox, Button } from "../elements";
import SEO from "../components/SEO";

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 50vw;

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
    grid-auto-rows: 60vw;
  }
`;

const Articles: React.FunctionComponent = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  const Posts = edges
    .filter((edge: any) => !!edge.node.frontmatter.date)
    .map((edge: any) => <PostLink key={edge.node.id} post={edge.node} />);
  // return <div>{Posts}</div>;
  return (
    <Layout color="#000">
      <SEO title="Articles | Waterwhip Labs" />

      <Area style={pageAnimation}>{Posts}</Area>
    </Layout>
  );
};

export default Articles;
export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
