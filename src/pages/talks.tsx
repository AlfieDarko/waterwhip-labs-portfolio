import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { config, useSpring, animated } from 'react-spring'
import Layout from '../components/layout'
import SEO from '../components/SEO'

const Area = styled(animated.div)`
  padding: 5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 5vw;

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
    grid-auto-rows: 30vw;
  }
`

const Talks: React.FunctionComponent = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout color="#000">
      <SEO title="Talks | Waterwhipped Labs" />

      <Area style={pageAnimation}>
        <h1>Talks @ Tech Meetups, Events & Conferences</h1>
        <h3>Coming Soon</h3>
      </Area>
    </Layout>
  )
}

export default Talks
