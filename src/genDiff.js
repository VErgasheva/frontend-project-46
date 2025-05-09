import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { type: 'added', key, value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] };
    }
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (_.isObject(val1) && _.isObject(val2) && !Array.isArray(val1) && !Array.isArray(val2)) {
      return { type: 'nested', key, children: buildDiff(val1, val2) };
    }
    if (!_.isEqual(val1, val2)) {
      return { type: 'changed', key, oldValue: val1, newValue: val2 };
    }
    return { type: 'unchanged', key, value: val1 };
  });
};

export default buildDiff;