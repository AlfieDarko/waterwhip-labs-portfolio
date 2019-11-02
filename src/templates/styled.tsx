import styled from "styled-components";
import { Box, AnimatedBox, Button } from "../elements";
import { transparentize, readableColor } from "polished";
import { animated } from "react-spring";

export const PBox = styled(AnimatedBox)`
  max-width: 1400px;
  margin: 0 auto;
`;

export const Content = styled(Box)<{ bg: string }>`
  background-color: ${props => transparentize(0.9, props.bg)};

  .gatsby-image-wrapper:not(:last-child) {
    margin-bottom: ${props => props.theme.space[10]};

    @media (max-width: ${props => props.theme.breakpoints[3]}) {
      margin-bottom: ${props => props.theme.space[8]};
    }
  }
`;

export const Category = styled(AnimatedBox)`
  letter-spacing: 0.05em;
  font-size: ${props => props.theme.fontSizes[1]};
  text-transform: uppercase;
`;

export const Description = styled(animated.div)`
  max-width: 960px;
  letter-spacing: -0.003em;
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  line-height: 1.58;
`;

export const PButton = styled(Button)<{ color: string }>`
  background: ${props => (props.color === "white" ? "black" : props.color)};
  color: ${props =>
    readableColor(props.color === "white" ? "black" : props.color)};
`;
