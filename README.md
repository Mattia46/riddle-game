# Riddle game

Riddle game is a project that let's you play with your friend.
This project was an excercise to practive various technologies, like AWS cloudformation, AWS
AppSync, AWS S3, AWS DynamoDB as well as Expo and React Native.

## How run the project
Make sure to have an AWS account first 😉, then

### Configure the dependencies and you AWS cloudformation

Clone the repo to your local machine:
```
git clone https://github.com/Mattia46/riddle-game.git
```

Make sure to globally install Expo and AWS Amplify:
```
npm install -g @aws-amplify/cli
npm install -g expo-cli
```

Once you've done it, install the project dependencies:
```
npm i
```

Then it's time to configure your `aws-exports` file that let's you run you Backend with AWS
```
amplify configure
amplify init
amplify push
```

### How to run start the project
```
npm start
```

Enjoy

Fell free to contribute opening a [PR](https://github.com/mattia46/riddle-game/pulls) to the project or open an [issue](https://github.com/mattia46/riddle-game/issues)
