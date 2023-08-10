// import { type EffectCallback, useEffect } from "react";

import React, { type EffectCallback } from "react";

// export function useEffectOnce(effect: EffectCallback) {
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(effect, []);
// }

export const useEffectOnce = (effect: EffectCallback) => {
  const effectRef = React.useRef(false);

  React.useEffect(() => {
    if (!effectRef.current) {
      effect();

      return () => {
        effectRef.current = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
