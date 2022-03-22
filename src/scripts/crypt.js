const key = process.env.REACT_APP_CRYPT_KEY;

export const cryptId = (id) => {
  return id
    .split('')
    .map((value) => value.charCodeAt(0) + Number(key))
    .join('&');
};

export const encryptId = (str) => {
  return str
    .split('&')
    .map((value) => String.fromCharCode(value - Number(key)))
    .join('');
};
