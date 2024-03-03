// export function cn(...inputs) {
//   const classes = [];
//
//   inputs.forEach((input) => {
//     if (typeof input === 'string') {
//       // Direct string input, just add it if not already present
//       if (!classes.includes(input)) {
//         classes.push(input);
//       }
//     } else if (Array.isArray(input)) {
//       // Array input, recursively process it
//       const nestedClasses = cn(...input);
//       nestedClasses.split(' ').forEach((cls) => {
//         if (!classes.includes(cls)) {
//           classes.push(cls);
//         }
//       });
//     } else if (typeof input === 'object' && input !== null) {
//       // Object input, add key if value is truthy
//       Object.keys(input).forEach((key) => {
//         if (input[key] && !classes.includes(key)) {
//           classes.push(key);
//         }
//       });
//     }
//   });
//
//   return classes.join(' ');
// }


export function cn(...inputs: (string | string[] | Record<string, boolean>)[]): string {
  const classes: string[] = [];

  inputs.forEach((input) => {
    if (typeof input === 'string') {
      // Direct string input, just add it if not already present
      if (!classes.includes(input)) {
        classes.push(input);
      }
    } else if (Array.isArray(input)) {
      // Array input, recursively process it
      const nestedClasses = cn(...input);
      nestedClasses.split(' ').forEach((cls) => {
        if (!classes.includes(cls)) {
          classes.push(cls);
        }
      });
    } else if (typeof input === 'object' && input !== null) {
      // Object input, add key if value is truthy
      Object.keys(input).forEach((key) => {
        if (input[key] && !classes.includes(key)) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
}
