import styled from 'styled-components';

export const ANIMATION_DURATION_MS = 200;

export const Dot = styled.div`
  background: ${(props) => props.theme.red};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  width: fit-content;
  text-align: center;
`;

export const AnimatedCartCount = styled.span`
  .count {
    transition: all ${ANIMATION_DURATION_MS / 1000}s;
    backface-visibility: hidden;
  }

  .count-enter {
    transform: rotateX(90deg);
  }

  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    transform: rotateX(0);
  }

  .count-exit-active {
    transform: rotateX(90deg);
  }
`;
