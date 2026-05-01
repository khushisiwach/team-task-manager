export const getId = (value) => {
  if (!value) return '';

  if (typeof value === 'object') {
    if (value._id) return String(value._id);
    return String(value);
  }

  return String(value);
};
