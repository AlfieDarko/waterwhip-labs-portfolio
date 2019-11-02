export type PageProps = {
  data: {
    project: {
      title_detail: string;
      color: string;
      category: string;
      desc: string;
      slug: string;
      parent: {
        modifiedTime: string;
        birthTime: string;
      };
      cover: {
        childImageSharp: {
          resize: {
            src: string;
          };
        };
      };
    };
    images: {
      nodes: {
        name: string;
        childImageSharp: {
          fluid: {
            aspectRatio: number;
            src: string;
            srcSet: string;
            sizes: string;
            base64: string;
            tracedSVG: string;
            srcWebp: string;
            srcSetWebp: string;
          };
        };
      }[];
    };
  };
};
