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
          attemps
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

export {
  getUserAnswer,
  onCreateAnswer,
  userByName,
};
