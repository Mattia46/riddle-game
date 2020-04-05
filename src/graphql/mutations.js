/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRiddle = /* GraphQL */ `
  mutation CreateRiddle(
    $input: CreateRiddleInput!
    $condition: ModelRiddleConditionInput
  ) {
    createRiddle(input: $input, condition: $condition) {
      id
      date
      riddle
      solution
      expired
    }
  }
`;
export const updateRiddle = /* GraphQL */ `
  mutation UpdateRiddle(
    $input: UpdateRiddleInput!
    $condition: ModelRiddleConditionInput
  ) {
    updateRiddle(input: $input, condition: $condition) {
      id
      date
      riddle
      solution
      expired
    }
  }
`;
export const deleteRiddle = /* GraphQL */ `
  mutation DeleteRiddle(
    $input: DeleteRiddleInput!
    $condition: ModelRiddleConditionInput
  ) {
    deleteRiddle(input: $input, condition: $condition) {
      id
      date
      riddle
      solution
      expired
    }
  }
`;
export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
      id
      riddle {
        id
        date
        riddle
        solution
        expired
      }
      user {
        id
        name
        avatar
        answers {
          nextToken
        }
      }
      date
      userSolution
      result
      attemps
    }
  }
`;
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
      id
      riddle {
        id
        date
        riddle
        solution
        expired
      }
      user {
        id
        name
        avatar
        answers {
          nextToken
        }
      }
      date
      userSolution
      result
      attemps
    }
  }
`;
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
      id
      riddle {
        id
        date
        riddle
        solution
        expired
      }
      user {
        id
        name
        avatar
        answers {
          nextToken
        }
      }
      date
      userSolution
      result
      attemps
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      avatar
      answers {
        items {
          id
          date
          userSolution
          result
          attemps
        }
        nextToken
      }
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      avatar
      answers {
        items {
          id
          date
          userSolution
          result
          attemps
        }
        nextToken
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      avatar
      answers {
        items {
          id
          date
          userSolution
          result
          attemps
        }
        nextToken
      }
    }
  }
`;
