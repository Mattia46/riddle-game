import React from 'react';
import Dialog from "react-native-dialog";

function OptionDialog({
  visible,
  setCompletedGame,
  setShowDialog,
  setSecondAttempt,
  setShowTimer,
}) {
  const completeTheGame = () => {
    setShowDialog(false);
    setCompletedGame(true);
    setShowTimer(false);
  };

  const continueTheGame = () => {
    setShowDialog(false);
    setSecondAttempt(1);
    setShowTimer(false);
  };

  return (
    <React.Fragment>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Time's up!</Dialog.Title>
        <Dialog.Description>
          Do you still wanna play?
        </Dialog.Description>
        <Dialog.Button label="Nope" onPress={completeTheGame}/>
        <Dialog.Button label="Yes, please" onPress={continueTheGame}/>
      </Dialog.Container>
    </React.Fragment>
  )
}
export { OptionDialog };
