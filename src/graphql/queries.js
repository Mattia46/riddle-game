/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRiddle = /* GraphQL */ `
  query GetRiddle($id: ID!) {
    getRiddle(id: $id) {
      id
      date
      riddle
      solution
      expired
    }
  }
`;
export const listRiddles = /* GraphQL */ `
  query ListRiddles(
    $filter: ModelRiddleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRiddles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        riddle
        solution
        expired
      }
      nextToken
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
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
export const listTodayAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        user {
          name
          avatar
        }
        userSolution
        result
      }
      nextToken
    }
  }
`;
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
        date
        userSolution
        result
        attemps
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsersAnswers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $filterAnswer: ModelAnswerFilterInput
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        avatar
        answers(filter: $filterAnswer) { items {
          userSolution result
        } }
        }
      }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        avatar
        answers {
          nextToken
        }
      }
      nextToken
    }
  }
`;
