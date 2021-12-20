import * as enumUtil from '../util/enumerations';
import { v4 as uuidv4 } from 'uuid';

export const NEW_QUESTION_OBJECT = (step) => {
  return {
    questionId: uuidv4(),
    type: enumUtil.questionTypes.LINE_TEXT,
    questionName: '',
    questionNameValue: '',
    name: '',
    isShowResponse: false,
    required: true,
    questionAnswers: [],
    isRating: false,
    bulkSelectedOption: 'EXIST',
    metadata: {
      maxLabel: '',
      minLabel: '',
      max: 10,
      min: 1,
      validation: { type: '' },
    },
    maxLabel: '',
    minLabel: '',
    max: 10,
    min: 1,
    step,
  };
};
