/**
 * 移动数组中元素(改变原数组)
 * @param {Array} array 数组
 * @param {Number} fromIndex 起始位置
 * @param {Number} toIndex 放置位置
 */
export function move(
  array: Array<any>,
  fromIndex: number,
  toIndex: number
): void {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
}

/**
 * 递归遍历数据并执行回调
 * @param {Array} data 要递归遍历的数据源
 * @param {String} childKey 子节点 key 值
 * @return {Function} 回调函数
 */
export function traverseNodes(
  data: Array<any>,
  childKey: string = 'children'
): Function {
  return function (cb: Function): void {
    data.forEach((node: any) => {
      cb && cb(node);
      if (node[childKey] && node[childKey].length) {
        traverseNodes(node[childKey], childKey)(cb);
      }
    });
  };
}

/**
 * 递归删除数据（改变源数组）
 * @param {Array} data 要递归遍历的数据源
 * @param {String} filterKey 要过滤的 key 值
 * @param {String} childKey 子节点 key 值
 * @return {Function} 回调函数
 */
export function traverseFilterNodes(
  data: Array<any>,
  filterKey: string,
  childKey: string = 'children'
) {
  return function (val: any) {
    if (!Array.isArray(data)) return [];

    for (let i = data.length - 1; i >= 0; i--) {
      const item = data[i];
      item[filterKey] === val
        ? data.splice(i, 1)
        : traverseFilterNodes(item[childKey], filterKey, childKey)(val);
    }
  };
}
