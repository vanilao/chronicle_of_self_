// Password strength calculation utility
export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'Weak', color: '#ef4444' };

  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    longLength: password.length >= 12
  };

  // Score calculation
  if (checks.length) score += 1;
  if (checks.lowercase) score += 1;
  if (checks.uppercase) score += 1;
  if (checks.numbers) score += 1;
  if (checks.special) score += 1;
  if (checks.longLength) score += 1;

  // Determine strength label and color
  let label, color;
  if (score <= 2) {
    label = 'Weak';
    color = '#ef4444'; // red
  } else if (score <= 4) {
    label = 'Medium';
    color = '#f59e0b'; // amber
  } else {
    label = 'Strong';
    color = '#10b981'; // green
  }

  return { score, label, color, checks };
};

export const getPasswordStrengthText = (password) => {
  const { label } = calculatePasswordStrength(password);
  return label;
};

export const getPasswordStrengthColor = (password) => {
  const { color } = calculatePasswordStrength(password);
  return color;
};
