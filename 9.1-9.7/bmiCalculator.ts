// interface Details {
//   weight: number;
//   height: number;
// }

// const parseArgs = (args: Array<string>): Details => {
//   if (args.length < 4) {
//     throw new Error('Too few arguments.');
//   }
//   if (args.length > 4) {
//     throw new Error('Too many arguments.');
//   }
//   const weight = Number(args[2]);
//   const height = Number(args[3]);
//   if (!isNaN(weight) && !isNaN(height)) {
//     return {
//       weight,
//       height,
//     };
//   } else {
//     throw new Error('Arguments not numbers.');
//   }
// };

export const calculateBmi = (weight: number, height: number): string => {
  const bmi: number = (weight / height ** 2) * 10000;
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal healthy weight';
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  }
  return 'Obese';
};

// try {
//   const { weight, height } = parseArgs(process.argv);
//   console.log(calculateBmi(weight, height));
// } catch (err) {
//   console.log(err.message);
// }
