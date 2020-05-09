import { AsyncStorage } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { riddleByDate, answerByDate } from '../src/graphql/queries';
import { getUserAnswer } from './shared';

const normaliseUserList = data => data.map(user => ({
  id: user.id,
  name: user.name,
  avatar: user.avatar,
  solution: user.answers?.items[0]?.userSolution || '',
  answer: user.answers?.items[0]?.result || false,
  answer: user.answers.items[0],
  hasAnswered: user.answers?.items[0]?.userSolution ? true : false,
  result: user.answers?.items.length
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

const getTodayRiddle = async () => await API.graphql(graphqlOperation(riddleByDate, { date: today }))
  .then(({data: { riddleByDate: { items }}}) => items[0])
  .catch(err => alert('Error getTodayRiddle utils'))

const getUsersAnswer = async () => await API.graphql(graphqlOperation(getUserAnswer, { filter: { date: { eq: today}}}))
    .then(({data: { listUsers: { items }}}) => normaliseUserList(items))
    .catch(({errors}) => alert('Error user Answer'));

const getTodayUserAnswer = async ({id}) => await API.graphql(graphqlOperation(answerByDate, { limit: 15, date: today }))
  .then(({data: { answerByDate: { items }}}) => {
    const [answer] = items.filter(({user}) => user.id === id)
    if(answer && answer.userSolution && answer.riddle) {
      return normaliseUserAnswer(answer);
    }
    return {};
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
}
