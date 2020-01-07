// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const projectTemplate = require.resolve("./src/templates/project.tsx");
  const articleTemplate = require.resolve("./src/templates/article.tsx");

  const result = await wrapper(
    graphql(`
      {
        projects: allProjectsYaml {
          nodes {
            slug
            images
          }
        }
      }
    `)
  );

  const result2 = await graphql(`
    {
      articles: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  result.data.projects.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: projectTemplate,
      context: {
        slug: node.slug,
        images: `/${node.images}/`
      }
    });
  });

  result2.data.articles.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: articleTemplate,
      context: {} // additioonal data can be passed via context
    });
  });
};
