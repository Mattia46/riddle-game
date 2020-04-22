import React from 'react';
import CountDown from 'react-native-countdown-component';

function Timer({setShowDialog}) {
  return (
    <CountDown
      digitStyle={{backgroundColor: 'orange'}}
      digitTxtStyle={{color: 'white'}}
      until={10}
      timeToShow={['M', 'S']}
      timeLabels={{m: 'MM', s: 'SS'}}
      onFinish={() => setShowDialog(true)}
      size={15}
    />
  )
}

export { Timer };
