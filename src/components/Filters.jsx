import React from "react";
import BasicMenu from "./CustomMenu";
import "../styles/Filters.css";
function Filters({ filtersData, setFiltersData }) {
  return (
    <div className="filters-container">
      {filtersData.map((obj, i) => {
        return (
          <BasicMenu
            key={i}
            setFiltersData={setFiltersData}
            filtersData={filtersData}
            filterObj={obj}
          />
        );
      })}
    </div>
  );
}

export default Filters;
