window.LOG_LEVEL = "DEBUG";
get AWSDate:
```
new Date().toISOString().split('T')[0]
```

Retrive today riddle:
```
query listTodayRiddle{
  listRiddles(filter:{
    date: { eq:"2019-04-26"}
  }) {
    items {
      id riddle solution date
    }
  }
}

query listTodayRiddle {
  listRiddles(filter:{
    date:{ eq:"2019-04-25"}
  }) {
    items {
      id riddle
    }
  }
}

query listTodayRiddleSolution {
  listRiddles(filter:{
    date:{ eq:"2019-04-25"}
  }) {
    items {
      id riddle solution
    }
  }
}
mutation createUser {
  createUser(input:{
    name:"mau"
    avatar:"s3:location"
  }) {
    id name
  }
}

query listUser {
  listUsers {
    items {
      id name
    }
  }
}

query getUserAnwsers {
	getUser(id:"673c7c9e-0de4-405d-82ee-30115d21a3ee") {
    answers {
      items {
        result
        userSolution
      }
    }
  }
}

mutation createAnswer{
  createAnswer(input:{
  	answerRiddleId: "5053e46a-3947-4775-a7df-283df1dc14d7"
    answerUserId:"673c7c9e-0de4-405d-82ee-30115d21a3ee"
    userSolution:"some solution"
  }) {
    id userSolution user {
    	name id
    }
  }
}

query listUserCorrect {
  listAnswers(filter:{
    result:{ eq: false}
  }) {
    items{
      user {
        name
      }
    }
  }
}

query listUserThatAnswered {
  listAnswers(filter:{
    hasAnswered:{ eq: false}
  }) {
    items{
      user {
        name
      }
    }
  }
}

```
