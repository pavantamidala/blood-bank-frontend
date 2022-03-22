import React, { useEffect, useState } from "react";
import BasicMenu from "../components/CustomMenu";
import Filters from "../components/Filters";
import Map from "../components/Map";
// import Autocomplete from "react-google-autocomplete";
import { checkAndAddDifference, createObjWithChecked } from "../shared/CommonMethods";
import { BASE_DATA } from "../shared/dataStore/config";
import queryString from "query-string";
import Profile from "./Profile";
import { Modal, Button } from "antd";
import axios from "axios";
// import {MyMapWithAutocomplete} from "../components/autocomplete";
function Main() {
  const [filtersData, setFiltersData] = useState(BASE_DATA.FILTERS_DATA);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    axios.get('get-filters').then((res)=>{
      console.log(res)
      let filters  = JSON.parse(res.data)
      let newArr = filtersData.map((obj)=>{
        obj.filters =  filters[obj.name]
        obj.filters = createObjWithChecked(obj.filters);
        return obj 
      })
      // console.log(filtersData)
      setFiltersData(newArr)
    }).catch((err)=>{
      console.log(err)
    })
    // let data = filtersData.map((obj) => {
    //   obj.filters = ["hello", "hi"];
    //   // checkAndAddDifference();
    //   obj.filters = createObjWithChecked(obj.filters);
    //   return obj;
    // });
    console.log(queryString);
    var query = queryString.parse(window.location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/");
    }
    // setFiltersData(data);
  }, []);

  return (
    <div>
      {/* <Profile /> */}
      <Button type="primary" onClick={showModal}>
        Profile
      </Button>
      <Modal
        width={"1100px"}
        title="Edit Profile"
        visible={isModalVisible}
        // onOk={false}
        onCancel={handleCancel}
        footer={null}
      >
        {isModalVisible && <Profile />}
      </Modal>
      <Filters filtersData={filtersData} setFiltersData={setFiltersData} />
      {/* {!isModalVisible && <Map />} */}
      <Map />

      {/* <CustomMenu /> */}
      {/* <BasicMenu /> */}
      {/* <Autocomplete
        style={{ display: "none" }}
        apiKey={"AIzaSyDDdcrX0rUGZi9kplSBZ7hA-4c0Zjl5E0s"}
        onPlaceSelected={(place) => {
          // setAddress((val) => {
          //   return {
          //     formatted_address: place.formatted_address,
          //     place_id: place.place_id,
          //     lat: place.geometry.location.lat(),
          //     lng: place.geometry.location.lng(),
          //   };
          // });
        }}
      /> */}
    </div>
  );
}

export default Main;
