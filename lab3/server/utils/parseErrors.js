import _ from "lodash"

export default errors => {
  const result = {}
  _.forEach(errors, (val, key) => {
    const message = `Пользователь с таким ${key} уже зарегистрирован.`
    result[key] = message
  })
  return result
}
