import {
  BLOOD_GROUP,
  BLOOD_CELLS,
  LAST_3_MONTHS_DONATED,
  AGE_GROUP,
  GENDER,
  LOCATION,
} from "../constants";

export const BASE_DATA = {
  FILTERS_DATA: [
    {
      name: BLOOD_GROUP,
      filters: [],
      selectedFilters: [],
    },
    {
      name: BLOOD_CELLS,
      filters: [],
      selectedFilters: [],
    },
    {
      name: LAST_3_MONTHS_DONATED,
      filters: [],
      selectedFilters: [],
    },
    {
      name: AGE_GROUP,
      filters: [],
      selectedFilters: [],
    },
    {
      name: GENDER,
      filters: [],
      selectedFilters: [],
    },
    {
      name: LOCATION,
      filters: [],
      selectedFilters: [],
    },
  ],
};
