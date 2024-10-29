/**
 * This calc is made "layer by layer", distributing a larger chunk of width in each iteration
 * @param {Array} itemList - List of spaces to balance (Must be provided in ascendent order to work)
 * @param {Number} availableSpace - The amount of space to be distributed
 */
export const balanceSpacePerItem = (
  itemList: number[],
  availableSpace: number
) => {
  const totalSpaceUsed = _spacesFactory();
  const maxItemSize = _spacesFactory();

  return itemList.reduce((newList: number[], current, index, arr) => {
    // Check if the array provided is properly ordered
    if (index > 0) _checkListOrder(arr[index - 1], current);

    const lastItemSize: number = index > 0 ? newList[index - 1] : 0;

    // Once the maximum possible size of the item is reached, apply this size directly.
    if (maxItemSize.value) {
      totalSpaceUsed.add(maxItemSize.value);
      return [...newList, lastItemSize];
    }

    /** Precalculate "existingSum + spaceSum" taking into account
     * all next items supposing all they use current size */
    const timesToApply = arr.length - index;
    const virtualTotalsSum = totalSpaceUsed.value + current * timesToApply;

    /** First "Bigger" tab behaviour: If the virtual-sum of next items using this size
     * doesn't fit within available space, calc maxItemSize */
    if (virtualTotalsSum >= availableSpace) {
      const remainder =
        availableSpace - (totalSpaceUsed.value + lastItemSize * timesToApply);
      const remainderPortionPerItem = Math.floor(remainder / timesToApply);
      maxItemSize.set(lastItemSize + remainderPortionPerItem);

      totalSpaceUsed.add(maxItemSize.value);

      return [...newList, maxItemSize.value];
    }

    //"Normal" behaviour: Apply this new size to current
    totalSpaceUsed.add(current);
    return [...newList, current];
  }, []);
};

/* Balance helper functions: */

function _checkListOrder(prev: number, current: number) {
  if (prev > current) {
    throw new Error(
      'Disordered list. Please provide an ascendent ordered list as param *itemlist*'
    );
  }
}

function _spacesFactory() {
  let _size = 0;
  //Assure we are setting natural num w/o decimals
  const _adjustNum = (num: number) => {
    if (typeof num !== 'number') throw new Error('Number must be provided');
    return Math.max(0, Math.floor(num));
  };
  const add = (qty: number) => (_size += _adjustNum(qty));
  const set = (qty: number) => (_size = _adjustNum(qty));
  return {
    get value() {
      return _size;
    },
    add,
    set,
  };
}
