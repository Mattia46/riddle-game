# Riddle game

Riddle game is a project that let's you play with your friend.

This project was an excercise to practive various technologies, like AWS cloudformation, AWS
AppSync, AWS S3, AWS DynamoDB with [Amplify](https://aws-amplify.github.io/) as well as
[Expo](https://docs.expo.io/versions/v37.0.0/get-started/installation/) and [React Native](https://reactnative.dev/)

<img src="/assets/images/RankList.png" width="100">
![alt text](/welcomePage.png)
![alt text](/assets/images/RankList.png)
![alt text](/assets/images/room.png)

## How run the project
Make sure to have an `AWS account` first 😉, then

### 1.1) Configure the dependencies and you AWS cloudformation

#### Clone the repo to your local machine:
```
git clone https://github.com/Mattia46/riddle-game.git
```

#### Globally install `Expo` and `AWS Amplify`:
```
npm install -g @aws-amplify/cli
npm install -g expo-cli
```

#### Once you've done it, install the project dependencies:
```
npm i
```

#### Then it's time to configure your `aws-exports` file that let's you run you Backend with AWS
```
amplify configure
amplify init
amplify push
```

### 1.2) How to run start the project
```
npm start
```

### Enjoy 🎉🎉

Fell free to contribute opening a [PR](https://github.com/mattia46/riddle-game/pulls) to the project or open an [issue](https://github.com/mattia46/riddle-game/issues)
