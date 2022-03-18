import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import "../styles/CustomMenu.css";
export default function BasicMenu({ filterObj, filtersData, setFiltersData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <span> {obj.name} </span>
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
