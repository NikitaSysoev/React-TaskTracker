function deepClone(obj) {
  const newObj = Array.isArray(obj) ? [] : {};
  for (const [k, v] of Object.entries(obj)) {
    newObj[k] = typeof v === 'object' ? deepClone(v) : v;
  }
  return newObj;
}

function cloneObject(...args) {
  let obj = {};
  for (let i = 0; i < args.length; i++) {
    const clone = deepClone(args[i]);
    obj = { ...obj, ...clone };
  }
  return obj;
}

export default cloneObject;
