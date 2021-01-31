const isEmpty = sourceObject => {
  for (let _ in sourceObject) {
    return false;
  }
  return true;
};

const removeEmpties = sourceObject => {
  const removedEmptyKeys = Object.entries(sourceObject)
    .filter(([key, value]) => Boolean(value))
    .reduce((newObject, [key, value]) => ({ ...newObject, [key]: value }), {});

  if (isEmpty(removedEmptyKeys)) return;
  return removedEmptyKeys;
};

module.exports = {
  isEmpty,
  removeEmpties
};
