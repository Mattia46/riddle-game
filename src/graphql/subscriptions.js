/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRiddle = /* GraphQL */ `
  subscription OnCreateRiddle {
    onCreateRiddle {
      id
      date
      riddle
      solution
      expired
    }
  }
`;
export const onUpdateRiddle = /* GraphQL */ `
  subscription OnUpdateRiddle {
    onUpdateRiddle {
      id
      date
      riddle
      solution
      expired
    }
  }
`;
export const onDeleteRiddle = /* GraphQL */ `
  subscription OnDeleteRiddle {
    onDeleteRiddle {
      id
      date
      riddle
      solution
      expired
    }
  }
`;
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer {
    onCreateAnswer {
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
        answersByDate {
          nextToken
        }
        answers {
          nextToken
        }
      }
      userID
      date
      userSolution
      result
      attemps
    }
  }
`;
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer {
    onUpdateAnswer {
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
        answersByDate {
          nextToken
        }
        answers {
          nextToken
        }
      }
      userID
      date
      userSolution
      result
      attemps
    }
  }
`;
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer {
    onDeleteAnswer {
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
        answersByDate {
          nextToken
        }
        answers {
          nextToken
        }
      }
      userID
      date
      userSolution
      result
      attemps
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      avatar
      answersByDate {
        items {
          id
          userID
          date
          userSolution
          result
          attemps
        }
        nextToken
      }
      answers {
        items {
          id
          userID
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      avatar
      answersByDate {
        items {
          id
          userID
          date
          userSolution
          result
          attemps
        }
        nextToken
      }
      answers {
        items {
          id
          userID
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      avatar
      answersByDate {
        items {
          id
          userID
          date
          userSolution
          result
          attemps
        }
        nextToken
      }
      answers {
        items {
          id
          userID
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
