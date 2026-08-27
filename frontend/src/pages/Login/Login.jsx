import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Button from '../../components/Button/Button';
import styles from './Login.module.css';

const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setStep(2);
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      navigate('/onboarding');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only one digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Backspace auto-focus previous
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Kisan Setu mein Aapka Swagat! 🙏</h1>
        <p className={styles.subtitle}>Apne mobile number se login karke aage badhein</p>
      </div>

      <div className={styles.formContainer}>
        {step === 1 ? (
          <div className={styles.step}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Mobile Number Daalo</label>
              <div className={styles.mobileInputWrapper}>
                <span className={styles.countryCode}>+91</span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={styles.mobileInput}
                />
              </div>
            </div>
            <Button 
              fullWidth 
              onClick={handleSendOtp} 
              disabled={mobile.length !== 10}
            >
              OTP Bhejo <ArrowRight size={20} />
            </Button>
          </div>
        ) : (
          <div className={styles.step}>
             <div className={styles.inputGroup}>
              <label className={styles.label}>Enter 6-Digit OTP</label>
              <div className={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="tel"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={styles.otpInput}
                  />
                ))}
              </div>
            </div>
            <Button 
              fullWidth 
              onClick={handleVerifyOtp}
              disabled={otp.join('').length !== 6}
            >
              OTP Verify Karo <Check size={20} />
            </Button>
            
            <p className={styles.resendText}>
              OTP nahi mila? <span className={styles.resendLink}>Resend (45s)</span>
            </p>
          </div>
        )}
      </div>

      <div className={styles.termsFooter}>
        <p>Aage badhakar aap hamare niyam v sharton ko sweekar karte hain</p>
      </div>
    </div>
  );
};

export default Login;
