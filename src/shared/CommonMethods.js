export const createObjWithChecked = function (arr) {
  console.log(arr)
  return arr.map((val) => {
    return {
      checked: false,
      name: val,
      disabled: false,
    };
  });
};

export const checkAndAddDifference = function (exiArr, ArrToAdd) {
  let ans = ArrToAdd.filter((val) => {
    return !exiArr.includes(val);
  });
  return [...exiArr, ...ans];
};

export const getObjFromKey = function(key,arr){
 return arr.filter(obj=>obj.name===key) 
}

export const getSelectedFiltersArr = function(arr){
  return arr[0]['selectedFilters']
}

export const getCheckedValues = function(arr){
  return arr.filter((obj)=>obj.checked).map(obj=>obj.name)
}