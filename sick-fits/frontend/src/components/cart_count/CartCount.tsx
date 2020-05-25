import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import {
  Dot,
  ANIMATION_DURATION_MS,
  AnimatedCartCount,
} from './cart_count_styles';

interface Props {
  count: number;
}
export const CartCount: React.FC<Props> = ({ count }) => {
  return (
    <AnimatedCartCount>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={count}
          timeout={ANIMATION_DURATION_MS}
          className='count'
          classNames='count'>
          <Dot>{count}</Dot>
        </CSSTransition>
      </SwitchTransition>
    </AnimatedCartCount>
  );
};
