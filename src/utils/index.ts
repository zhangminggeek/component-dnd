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
