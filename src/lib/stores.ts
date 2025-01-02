import { writable, derived } from 'svelte/store';
import type { AssessmentData, UserData, Answer } from './types';
import { questions } from '../data/questions';

// Helper to handle local storage
const createLocalStore = <T>(key: string, initialValue: T) => {
    // Get stored value on initialization
    const stored = localStorage.getItem(key);
    const initial = stored ? JSON.parse(stored) : initialValue;
    
    const store = writable<T>(initial);
    
    // Subscribe to changes and update localStorage
    store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
    });
    
    return store;
};

// Create our main assessment store
export const assessment = createLocalStore<AssessmentData>('aiAssessmentData', {
    userData: null,
    answers: [],
    currentQuestionIndex: 0,
    isComplete: false
});

// Actions (similar to your previous hook methods)
export const assessmentActions = {
    updateUserData: (userData: UserData) => {
        assessment.update(state => {
            const newState = {
                ...state,
                userData
            };
            // Force a store update
            assessment.set(newState);
            return newState;
        });
    },

    addAnswer: (answer: Answer) => {
        assessment.update(state => {
            const newState = {
                ...state,
                answers: [...state.answers, answer],
                currentQuestionIndex: state.currentQuestionIndex + 1,
                isComplete: state.currentQuestionIndex + 1 === questions.length
            };
            // Force a store update
            assessment.set(newState);
            return newState;
        });
    },
    resetAssessment: () => {
        const newState = {
            userData: null,
            answers: [],
            currentQuestionIndex: 0,
            isComplete: false
        };
        assessment.set(newState);
        return newState;
    }
};

// Derived store for current stage
export const currentStage = derived(assessment, $assessment => {
    if (!$assessment.userData) return 'initial';
    if (!$assessment.isComplete) return 'survey';
    return 'results';
});