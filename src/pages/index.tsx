import React from 'react'
import { config, useSpring } from 'react-spring'
import styled from 'styled-components'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'

const boldStyle = styled.span`
  font-weight: bold;
`
const Index = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO title="About | WaterWhipped Labs" desc="Web Engineering" />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 14]}>
        <article>
          <h1>We are... Waterwhipped labs.</h1>
          <p>
            Waterwhipped is a London based Web Engineering consultancy. Our focus lies within Javascript ecosystem and
            are well versed in tech like React, React Native, Node.js & GraphQL.
          </p>

          <p>Some of our clients include UK Superstore Tesco, and smaller start-ups like ClickCleanit</p>

          <p>
            We are also working on a SAAS product called <a href="https://paymentspage.io">PaymentsPage</a> that helps
            people create beautiful checkout experiences with no code
          </p>

          <p>
            Having worked on various large commercial react codebases with scalability as a priority, We are well
            equipped to tackle your project.
          </p>

          {/* INSERT CTA BUTTON BELOW, BIG AND EYE-CATCHING */}
          <p>Let's talk contract's > info[at]waterwhipped.com</p>
        </article>
      </AnimatedBox>
    </Layout>
  )
}

export default Index
