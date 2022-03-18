import React, { useEffect, useState } from "react";
import BasicMenu from "../components/CustomMenu";
import Filters from "../components/Filters";
import Map from "../components/Map";
import { createObjWithChecked } from "../shared/CommonMethods";
import { BASE_DATA } from "../shared/dataStore/config";

function Main() {
  const [filtersData, setFiltersData] = useState(BASE_DATA.FILTERS_DATA);
  useEffect(() => {
    let data = filtersData.map((obj) => {
      obj.filters = ["hello", "hi"];
      obj.filters = createObjWithChecked(obj.filters);
      return obj;
    });
    setFiltersData(data);
  }, []);

  return (
    <div>
      <Filters filtersData={filtersData} setFiltersData={setFiltersData} />
      <Map />
      {/* <CustomMenu /> */}
      {/* <BasicMenu /> */}
    </div>
  );
}

export default Main;
