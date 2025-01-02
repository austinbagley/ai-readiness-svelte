import { writable, derived } from 'svelte/store';
import type { AssessmentData, UserData, Answer } from './types';
import { questions } from '../data/questions';

function createAssessmentStore() {
  const { subscribe, set, update } = writable<AssessmentData>({
    userData: null,
    answers: [],
    currentQuestionIndex: 0,
    isComplete: false
  });

  return {
    subscribe,
    updateUserData: (userData: UserData) => {
      update(state => ({
        ...state,
        userData
      }));
    },
    addAnswer: (answer: Answer) => {
      update(state => ({
        ...state,
        answers: [...state.answers, answer],
        currentQuestionIndex: state.currentQuestionIndex + 1,
        isComplete: state.currentQuestionIndex + 1 === questions.length
      }));
    },
    reset: () => {
      set({
        userData: null,
        answers: [],
        currentQuestionIndex: 0,
        isComplete: false
      });
    }
  };
}

export const assessment = createAssessmentStore();

export const currentStage = derived(assessment, $assessment => {
  if (!$assessment.userData) return 'initial';
  if (!$assessment.isComplete) return 'survey';
  return 'results';
});