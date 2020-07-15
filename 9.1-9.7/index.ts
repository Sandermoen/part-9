import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
    return res.status(400).json({ error: 'Malformatted parameters.' });
  }
  return res.json({
    weight,
    height,
    bmi: calculateBmi(Number(weight), Number(height)),
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || daily_exercises.length === 0 || !target) {
    return res.status(400).json({ error: 'parameters missing.' });
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters.' });
  }
  const notNumber = daily_exercises.find((hours) => isNaN(Number(hours)));
  if (notNumber)
    return res.status(400).json({ error: 'malformatted parameters.' });
  const exerciseStats = calculateExercise(daily_exercises, Number(target));
  return res.json(exerciseStats);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
