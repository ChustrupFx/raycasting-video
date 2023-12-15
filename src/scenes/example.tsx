import { Line, makeScene2D } from '@motion-canvas/2d';
import { Vector2, createRef, createSignal, easeOutBounce, tween, waitFor } from '@motion-canvas/core';

class Stripe extends Line {



}

export default makeScene2D(function* (view) {
  // Create your animations here

  const stripe = createRef<Stripe>();
  const length = createSignal(0)

  const points = createSignal([100, 100])


  view.add(
    <Stripe
      ref={stripe}
      points={[

        () => Vector2.left.scale(length() * 100),
        () => Vector2.right.scale(length() * 100)

      ]}
      endOffset={8}
      lineWidth={2}
      stroke={'#242424'}
    />
  )


  yield* length(0, 0)

  yield* tween(1, (value) => {

    length(easeOutBounce(value, 0, 5))

  })

  yield* waitFor(0.5)

  yield* tween(1, (value) => {

    length(easeOutBounce(value, 5, 2))

  })
});
