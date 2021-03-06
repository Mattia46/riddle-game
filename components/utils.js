import { AsyncStorage } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { riddleByDate, answerByDate } from '../src/graphql/queries';
import { createAnswer, updateAnswer } from '../src/graphql/mutations';
import { getUserAnswer } from './shared';

const getStars = array => array.map(item => {
  let stars = 0;
  if(item.result === true) {
    stars = item.attemps === 1 || item.attemps === 0 ? 1.5 : 1
  }
  return stars;
})

const normaliseUserList = data => data.map(user => ({
  id: user.id,
  name: user.name,
  avatar: user.avatar,
  solution: user.answers?.items[0]?.userSolution || '',
  correct: user.answers?.items[0]?.result || false,
  answer: user.answers.items[0],
  hasAnswered: user.answers?.items[0]?.userSolution ? true : false,
  stars: getStars(user.answers.items).reduce((a, c) => a + c, 0),
}));

const normaliseUserAnswer = answer => ({
  date: answer.riddle.date,
  userSolution: answer.userSolution,
  id: answer.id,
  result: answer.result,
  attemps: answer.attemps,
  answerRiddleId: answer.riddle.id,
  answerUserId: answer.user.id,
})

const today = new Date().toISOString().split('T')[0]

const getUserFromLocal = async () => {
  const user = await AsyncStorage.getItem('user');
  return JSON.parse(user);
}

const getIsGameStarted = async () => {
  const isGameStarted = await AsyncStorage.getItem('isGameStarted');
  return isGameStarted && isGameStarted === today
    ? true
    : false;
};

const setGameStartedToday = async () => {
  await AsyncStorage.setItem('isGameStarted', today);
};

const getUsersAnswer = async () => await API.graphql(graphqlOperation(getUserAnswer, { filter: { date: { eq: today}}}))
  .then(({data: { listUsers: { items }}}) => normaliseUserList(items))
  .catch(({errors}) => alert('Error user Answer'));

const updateUserAnswer = async answer => await API.graphql(graphqlOperation(updateAnswer, { input: { ...answer}}))

const getTodayRiddle = async () => await API.graphql(graphqlOperation(riddleByDate, { date: today }))
  .then(({data: { riddleByDate: { items }}}) => items[0])
  .catch(err => alert('Error getTodayRiddle utils'))

const getTodayUserAnswer = async ({id}) => await API.graphql(graphqlOperation(answerByDate, { limit: 15, date: today }))
  .then(({data: { answerByDate: { items }}}) => {
    const [answer] = items.filter(({user}) => user.id === id)
    if(answer && answer.userSolution && answer.riddle) {
      return normaliseUserAnswer(answer);
    }
    return {attemps: 0};
  }).catch(err => alert('Error getTodayUserAnswer utils'));

const initRiddle = () => ({
  expired: false,
  date: today,
  solution: '',
  riddle: '',
});

export {
  getUserFromLocal,
  getTodayRiddle,
  getTodayUserAnswer,
  normaliseUserList,
  getUsersAnswer,
  initRiddle,
  getIsGameStarted,
  setGameStartedToday,
  updateUserAnswer,
}
