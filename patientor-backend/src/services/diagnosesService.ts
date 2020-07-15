import diagnoses from '../../data/diagnoses';

import { Diagonse } from '../types';

const getDiagnoses = (): Array<Diagonse> => {
  return diagnoses;
};

export default { getDiagnoses };
