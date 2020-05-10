import React from 'react';
import Dialog from "react-native-dialog";

function OptionDialog({
  visible,
  continueGame,
  stopGame,
}) {
    return (
    <React.Fragment>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Time's up!</Dialog.Title>
        <Dialog.Description>
          Do you still wanna play?
        </Dialog.Description>
        <Dialog.Button label="Nope" onPress={stopGame}/>
        <Dialog.Button label="Yes, please" onPress={continueGame}/>
      </Dialog.Container>
    </React.Fragment>
  )
}
export { OptionDialog };
