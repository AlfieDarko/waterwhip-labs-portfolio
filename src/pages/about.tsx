import React from 'react'
import { config, useSpring } from 'react-spring'
import styled from 'styled-components'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'

const boldStyle = styled.span`
  font-weight: bold;
`
const About = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO title="About | WaterwhippedLabs" desc="Web Engineering" />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>Hi. I'm Waterwhipped Labs.</h1>
        <p>
          <boldStyle>I'm a web engineer who routinely develops production-quality code.</boldStyle>
          Having worked on various large commercial react codebases where scalability has been of the upmost importance,
          I'm well equipped to tackle your project.
        </p>

        <p>
          I enjoy contributing to component libraries & design systems at a moments notice. Trial by fire is my favorite
          type of learning experience. I look forward to working on greenfield projects, where a11y, UX & security
          issues haven't been ironed out yet.
        </p>

        <p>
          Recently I have been helping UK Superstore Tesco develop their component library, improve their performance
          logging & implementing an online discounts wallet for their UK grocery user journey.
        </p>

        <p>
          On the side, Im working on a project called <a href="https://paymentspage.io">PaymentsPage</a> that helps
          people create beautiful checkout experiences with no code
        </p>

        <p>
          When I'm not reading / writing about javascript or helping people find their space in the tech industry, I
          spend the rest of my time making music.
        </p>
      </AnimatedBox>
    </Layout>
  )
}

export default About
