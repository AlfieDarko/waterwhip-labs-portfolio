import React from 'react'
import { ThemeProvider } from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'
import 'typeface-work-sans'
import { Box, Flex } from '../elements'
import theme from '../../config/theme'
import Logo from './logo'
import { GlobalStyles } from './globalStyles'
import { Wrapper, SideBarInner, Nav, Main, Footer } from './styled'

const isPartiallyActive = ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }) =>
  isPartiallyCurrent ? { className: 'navlink-active navlink' } : { className: 'navlink' }

const PartialNavLink = ({ children, to, ...rest }: { children: React.ReactNode; to: string }) => (
  <Link getProps={isPartiallyActive} to={to} {...rest}>
    {children}
  </Link>
)

type LayoutProps = { children: React.ReactNode } & typeof defaultProps

const defaultProps = {
  color: 'white',
}

interface QueryResult {
  navigation: {
    nodes: {
      name: string
      link: string
    }[]
  }
}

const Layout = ({ children, color }: LayoutProps) => {
  const data: QueryResult = useStaticQuery(query)

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Wrapper>
          <SideBarInner bg={color} as="aside" p={[6, 6, 8]}>
            <Flex
              flexWrap="nowrap"
              flexDirection={['row', 'row', 'row', 'column']}
              alignItems={['center', 'center', 'center', 'flex-start']}
              justifyContent="space-between"
            >
              <Box width={['3rem', '4rem', '5rem', '6rem']}>
                <Link to="/" aria-label="LekoArts, Back to Home">
                  {/* <Logo /> */}
                </Link>
              </Box>
              <Nav
                color={color}
                mt={[0, 0, 0, 10]}
                as="nav"
                flexWrap="nowrap"
                flexDirection={['row', 'row', 'row', 'column']}
                alignItems="flex-start"
              >
                {data.navigation.nodes.map(item => (
                  <PartialNavLink to={item.link} key={item.name}>
                    {item.name}
                  </PartialNavLink>
                ))}
              </Nav>
            </Flex>
          </SideBarInner>
          <Main>{children}</Main>
          <Footer color={color}>
            <Box p={[6, 6, 8]} fontSize={0}>
              <a href="https://www.waterwhipped.com">Waterwhipped Labs</a>.
              <br />
              <a href="https://www.waterwhipped.com">Web Engineering Specialists</a>.<br />
              <small> Javascript Ecosystem Residents</small>
            </Box>
          </Footer>
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout

Layout.defaultProps = defaultProps

const query = graphql`
  query Layout {
    navigation: allNavigationYaml {
      nodes {
        name
        link
      }
    }
  }
`
