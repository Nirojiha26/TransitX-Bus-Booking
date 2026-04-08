export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Checks if phone is only numbers and between 9-10 digits
  const regex = /^[0-9]{9,10}$/;
  return regex.test(phone);
};

export const validateUsername = (name: string): boolean => {
  return name.trim().length >= 3;
};