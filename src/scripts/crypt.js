const key = 642;

export const cryptId = (id) => {
  return id
    .split('')
    .map((value) => value.charCodeAt(0) + key)
    .join('a');
};

export const encryptId = (str) => {
  return str
    .split('a')
    .map((value) => String.fromCharCode(value - key))
    .join('');
};
