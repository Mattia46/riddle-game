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

const getTodayUserAnswer = /* GraphQL */ `
  query getTodayUserAnswer(
    $id: ID!
    $filter: ModelAnswerFilterInput
  ) {
    id
    name
    answers(filter: $filter})
    {
      items { id }
    }
  }
`;

export { getUserAnswer, onCreateAnswer, getTodayUserAnswer };
