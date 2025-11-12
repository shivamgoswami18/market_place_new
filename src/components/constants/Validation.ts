export const validationMessages = {
    required: (fieldName: string) =>
        `${fieldName?.charAt(0).toUpperCase() + fieldName?.slice(1).toLowerCase()} is required.`,
  format: (fieldName: string) => `Please enter a valid ${fieldName?.toLowerCase()}.`,
};

export const InputPlaceHolder = (fieldName: string) => {
  return `Enter ${fieldName?.toLowerCase()}`;
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}(?![^.\s])/;

