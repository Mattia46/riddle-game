import { AsyncStorage } from 'react-native';

const mapAndSortUserList = (items = []) => items.map(x => ({
  name: x.name,
  avatar: x.avatar,
  id: x.id,
  result: x.answers.items.length
})).sort((a,b) => (b.result - a.result));

const getNormaliseList = data => data.listUsers?.items.map(user => ({
  answer: user.answers?.items[0]?.result || false,
  name: user.name,
  avatar: user.avatar,
  solution: user.answers?.items[0]?.userSolution || '',
  id: user.id
})).sort((x, y) => y.answer - x.answer);

const getNormaliseUserLiveList = data => data.listUsers?.items.map(user => ({
  hasAnswered: user.answers?.items[0]?.userSolution ? true : false,
  name: user.name,
  avatar: user.avatar,
  id: user.id
}));

async function getUserFromLocal(setUser) {
  const user = await AsyncStorage.getItem('user');
  return JSON.parse(user);
}

export {
  mapAndSortUserList,
  getNormaliseList,
  getNormaliseUserLiveList,
  getUserFromLocal,
}
