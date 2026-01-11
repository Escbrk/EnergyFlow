export const emailChecker = email => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(email)) {
    throw new Error('Please enter a valid email address');
  }
};
