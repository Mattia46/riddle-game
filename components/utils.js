const mapAndSortUserList = (items = []) => items.map(x => ({
  name: x.name,
  avatar: x.avatar,
  id: x.id,
  result: x.answers.items.length
})).sort((a,b) => (b.result - a.result));


export {
  mapAndSortUserList,
}
