import { useEffect, useState } from 'react';

/**
 * 
 * @param {string[]} queries e.g. ["(min-width: 1200px)", "(max-width: 1199px)"]
 * @param {array} values to pick from, depending on the current media breakpoint value
 * @param {any} defaultValue selected value from [values] prop depending on the current media breakpoint value
 * @example 
 * 
 * const arrangement = useMedia(
    // media queries for desktop and mobile respectively
    ["(min-width: 1200px)", "(max-width: 1199px)"],
    // possible class names for desktop and mobile respectively
    [
      'text-black',
      'text-white'
    ],
    'text-white'
  );
 */
export const useMedia = (queries, values, defaultValue) => {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      // Remove listeners on cleanup
      return () =>
        mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );

  return value;
};
