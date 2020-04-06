import React from 'react';
import CountDown from 'react-native-countdown-component';

function Timer({riddle, onFinish}) {
  if(!riddle || riddle.expired) return null;
  const today = new Date();
  const endTime = new Date();
  endTime.setHours(12);
  endTime.setMinutes(25);
  endTime.setSeconds(60);
  const difference = (endTime.getTime() - today.getTime()) / 1000;

  return (
    <CountDown
      until={difference}
      size={40}
      onFinish={() => {
        alert('Finished')
        onFinish()
      }}
      digitStyle={{backgroundColor: '#FFF'}}
      digitTxtStyle={{color: '#1CC625'}}
      timeToShow={['M', 'S']}
      timeLabels={{m: 'MM', s: 'SS'}}
    />
  )
};


export { Timer };
