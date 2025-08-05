const isValidEmail = (email: string ) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const result = regex.test(email);
  return result;
}

export default isValidEmail;
