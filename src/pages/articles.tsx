import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { config, useSpring, animated } from 'react-spring'
import PostLink from '../components/post-link'
import Layout from '../components/layout'
import SEO from '../components/SEO'

const Area = styled(animated.div)`
  padding: 5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 10vw;

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    padding-bottom: 5rem;
    grid-template-columns: 1fr;
    grid-auto-rows: 20vw;
  }
`

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
`

const Articles: React.FunctionComponent = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  const Posts = edges
    .filter((edge: any) => !!edge.node.frontmatter.date)
    .map((edge: any) => <PostLink key={edge.node.id} post={edge.node} />)
  // return <div>{Posts}</div>;
  console.log(Posts)
  return (
    <Layout color="#000">
      <SEO title="Articles | WaterwhippedLabs" />

      <Area style={pageAnimation}>
        <h1>Articles</h1>
        {Posts}
      </Area>
    </Layout>
  )
}

export default Articles
