import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, ActivityIndicator } from 'react-native';

const OtpForm = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [finalOtp, setFinalOtp] = useState('');
  const [activeStep, setActiveStep] = useState(0)

  const router = useRouter()

  const nextFormStep = () => setActiveStep((prev) => prev + 1)

  const inputRefs = useRef([]);

  const handleChange = (value: any, index: any) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (!value) {
      setActiveOtpIndex(index - 1);
    } else {
      setActiveOtpIndex(index + 1);
    }
    setOtp(newOtp);
  };

  const handleKeyDown = (e:  React.KeyboardEvent<TextInput>, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (index > 0) {
        setActiveOtpIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    inputRefs.current[activeOtpIndex]?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    const lastElement = otp[otp.length - 1];
    if (lastElement === undefined || lastElement === '') {
      return;
    } else {
      setFinalOtp(otp.join(''));
      setIsLoading(true);

      // Simulating API call delay
      setTimeout(() => {
        nextFormStep();
        setIsLoading(false);
        
      }, 2000);
    }
  }, [otp, nextFormStep]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        {otp.map((value, index) => (
          <TextInput
            ref={(ref) => (inputRefs.current[index] = ref)}
            key={index}
            keyboardType="numeric"
            style={{
              width: 40,
              height: 40,
              borderWidth: 1,
              borderRadius: 5,
              textAlign: 'center',
              fontSize: 20,
              margin: 5,
              borderColor: 'gray',
              color: "black",
            }}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyDown(e, index)}
            value={value}
            placeholder="-"
            maxLength={1}
          />
        ))}
      </View>

      {isLoading && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default OtpForm;
