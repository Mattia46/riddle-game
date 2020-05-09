const getUserAnswer = /* GraphQL */ `
  query ListUserAnswer(
    $filter: ModelAnswerFilterInput
  ) {
  listUsers(limit: 15) {
    items {
      name avatar id
      answers(limit: 15 filter: $filter){
        items{
          id
          date
          userSolution
          result
        }
      }
    }
  }
}`;

const userByName = /* GraphQL */ `
  query UserByName(
    $name: String
  ) {
    userByName(
      name: $name
    ) {
      items {
        id
        name
        avatar
      }
    }
  }
`;

const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer {
    onCreateAnswer {
      user {
        id
        name
      }
      date
      userSolution
      result
      attemps
    }
  }`
;

// How to call getTodayUserAnswers
// API.graphql(graphqlOperation(getTodayUserAnswers, {id: id, filter: { date: { eq: today}}}));

const getTodayUserAnswers = /* GraphQL */ `
query GetUser(
  $id: ID!
  $filter: ModelAnswerFilterInput!
) {
  getUser(id: $id) {
    name
    answers(filter: $filter) {
      items {
        id
        date
        userSolution
      }
    }
  }
}`;


export {
  getUserAnswer,
  onCreateAnswer,
  getTodayUserAnswers,
  userByName,
};
