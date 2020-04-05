const getUserAnswer = /* GraphQL */ `
  query ListUserAnswer(
    $filter: ModelAnswerFilterInput
  ) {
  listUsers {
    items {
      name avatar id
      answers(filter: $filter){
        items{
          date
          userSolution
          result
        }
      }
    }
  }
}`;

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
};
