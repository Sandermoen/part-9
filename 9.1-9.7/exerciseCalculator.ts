interface Stats {
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// interface Arguments {
//   days: Array<number>;
//   target: number;
// }

// const parseArguments = (args: Array<string>): Arguments => {
//   if (args.length < 4) {
//     throw new Error('Too few arguments');
//   }
//   const target = Number(args[2]);
//   const days = args.slice(3).map((day) => {
//     if (isNaN(Number(day))) {
//       throw new Error('Provided days were not numbers');
//     }
//     return Number(day);
//   });
//   if (!isNaN(target)) {
//     return {
//       days,
//       target,
//     };
//   } else {
//     throw new Error('Provided target is not a number.');
//   }
// };

export const calculateExercise = (
  days: Array<number>,
  target: number
): Stats => {
  const total = days.reduce((acc, currentValue) => acc + currentValue, 0);
  const average = total / days.length;
  const trainingDays = days.reduce((acc, currentValue) => {
    if (currentValue) acc += 1;
    return acc;
  }, 0);
  const success = total >= target;
  let rating;
  let ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = 'Good job, you reached your target!';
  } else if (total >= target / 2) {
    rating = 2;
    ratingDescription = 'Not too bad could be better.';
  } else {
    rating = 1;
    ratingDescription = 'Try harder next time!';
  }

  return {
    trainingDays,
    success,
    rating: rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   const { days, target } = parseArguments(process.argv);
//   console.log(calculateExercise(days, target));
// } catch (err) {
//   console.log(err.message);
// }
