import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import "../styles/CustomMenu.css";
import {
  BLOOD_GROUP,
  BLOOD_CELLS,
  LAST_3_MONTHS_DONATED,
  AGE_GROUP,
  GENDER,
  LOCATION,
} from "../shared/constants";
import {
  getCheckedValues,
  getObjFromKey,
  getSelectedFiltersArr,
} from "../shared/CommonMethods";
import axios from "axios";
export default function BasicMenu({
  filterObj,
  filtersData,
  setFiltersData,
  setMapsData,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const success = (res) => {
    setMapsData(res["data"]);
    console.log(res["data"]);
  };
  const failure = (err) => {
    console.log(err);
  };
// React.useEffect(() => {
//   getMapData(filtersData, success, failure);
 
// }, []);
  const handleClose = () => {
    setAnchorEl(null);
    applyFilters();
    console.log(filtersData);
    getMapData(filtersData, success, failure);
  };
  function applyFilters() {
    let arr = filtersData.map((obj) => {
      obj.selectedFilters = getCheckedValues(obj.filters);
      return obj;
    });
    setFiltersData(arr);
  }

  function handleChange(e, val, o) {
    let index;

    let ans = filtersData.filter((obj, i) => {
      if (obj.name === val.name) {
        index = i;
      } else {
        // obj.name !== val.name;
        return obj;
      }
    });
    let ansArr = val.filters.map((an) => {
      if (an.name === o.name) {
        an.checked = e.target.checked;
      }
      return an;
    });
    let ob = { ...val, filters: ansArr };
    ans.splice(index, 0, ob);
    setFiltersData([...ans]);
  }
  const memoizedMapper = React.useCallback(getMapper,[])
  function getMapper(value,filterName) {
    console.log("fileter");
    if (value === true) {
      return "Yes";
    }
    if (value === false) {
      return "No";
    }
    if(filterName===LOCATION){
      return value.split(',')[0]
    }
    return value;
  }
  let val = filterObj.display;
  console.log(filterObj)
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}

      >
        {filterObj.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {filterObj.filters.map((obj, i) => {
          return (
            <MenuItem key={i}>
              <div className="custom-box">
                <span> {memoizedMapper(obj.name,filterObj.name)} </span>
                <Checkbox
                  checked={obj.checked}
                  onChange={(e) => handleChange(e, filterObj, obj)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

const getMapData = (data, success, failure) => {
  let payload = {
    bloodGroup: getSelectedFiltersArr(getObjFromKey(BLOOD_GROUP, data)),
    donatedBlood: getSelectedFiltersArr(
      getObjFromKey(LAST_3_MONTHS_DONATED, data)
    ),
    donatedBloodCelss: getSelectedFiltersArr(getObjFromKey(BLOOD_CELLS, data)),
    gender: getSelectedFiltersArr(getObjFromKey(GENDER, data)),
    // address:{formatted_address:'nellore'},
    formatted_address: getSelectedFiltersArr(getObjFromKey("Location", data)),
    // ageGroup: getSelectedFiltersArr(getObjFromKey(AGE_GROUP, data)),
  };
  let req = {
    method: "PUT",
    url: "/get-base-data",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ payload: payload }),
  };
  axios.put("/get-base-data", req).then(success).catch(failure);
};
