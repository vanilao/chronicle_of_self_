import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

// Validate environment variables
if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
  console.error('Missing EmailJS configuration. Please check your .env file.');
}

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Generate 6-digit verification code
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
export const sendVerificationEmail = async (email, username, verificationCode) => {
  try {
    console.log('Sending email with params:', { email, username, verificationCode });
    console.log('Using config:', { 
      serviceId: EMAILJS_SERVICE_ID, 
      templateId: EMAILJS_TEMPLATE_ID,
      hasPublicKey: !!EMAILJS_PUBLIC_KEY 
    });

    const templateParams = {
      to_email: email,
      username: username,
      verification_code: verificationCode,
      // Alternative variables EmailJS might expect
      email: email,
      user_name: username,
      code: verificationCode,
    };

    console.log('Template params:', templateParams);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('EmailJS response:', response);
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS error details:', {
      message: error.message,
      text: error.text,
      status: error.status,
      name: error.name
    });
    return { success: false, error: error.text || error.message };
  }
};

// Store verification code with expiration
export const storeVerificationCode = (email, code) => {
  const verificationData = {
    code,
    email,
    timestamp: Date.now(),
    expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutes
  };
  
  localStorage.setItem('verificationData', JSON.stringify(verificationData));
  return verificationData;
};

// Verify stored code
export const verifyStoredCode = (email, enteredCode) => {
  const storedData = localStorage.getItem('verificationData');
  
  if (!storedData) {
    return { valid: false, error: 'No verification data found' };
  }

  const verificationData = JSON.parse(storedData);
  
  // Check if expired
  if (Date.now() > verificationData.expiresAt) {
    localStorage.removeItem('verificationData');
    return { valid: false, error: 'Verification code has expired' };
  }

  // Check if email matches
  if (verificationData.email !== email) {
    return { valid: false, error: 'Email mismatch' };
  }

  // Check if code matches
  if (verificationData.code !== enteredCode) {
    return { valid: false, error: 'Invalid verification code' };
  }

  return { valid: true };
};

// Clear verification data
export const clearVerificationData = () => {
  localStorage.removeItem('verificationData');
};
