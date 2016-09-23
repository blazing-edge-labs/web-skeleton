import { SubmissionError } from 'redux-form';

export default function parseErrors(error) {
  const errors = { _error: error.message };
  if (error.response.debugInfo) {
    error.response.debugInfo.forEach((info) => {
      errors[info.path] = info.message;
    });
  }
  return new SubmissionError(errors);
}
