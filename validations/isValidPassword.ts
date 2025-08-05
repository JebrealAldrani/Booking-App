const isValidPassword = (password: string) => {
  const result = password.trim().length >= 8;

  return result;
}

export default isValidPassword;
