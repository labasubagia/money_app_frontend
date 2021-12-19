export const getHttpValidationError = (error) => {
  const isValidationError = error?.response?.status == 400;
  if (!isValidationError) return null;
  const errors = error?.response?.data?.errors ?? [];
  const result = {};
  errors.forEach(({ param, msg }) => (result[param] = msg));
  const isEmpty = Object.keys(result).length == 0;
  return isEmpty ? null : result;
};

export const getHttpErrorMessage = (error) => {
  return error?.response?.data?.message ?? null;
};
