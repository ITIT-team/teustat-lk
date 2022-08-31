export const compareObjects = (obj1, obj2) => {
  let flag = true
  Object.keys(obj1).forEach(key => {
    if (obj1[key] !== obj2[key]) flag = false
  })
  return flag
}
