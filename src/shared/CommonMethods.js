export const createObjWithChecked = function (arr) {
  return arr.map((val) => {
    return {
      checked: false,
      name: val,
      disabled: false,
    };
  });
};
