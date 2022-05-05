import React, { useEffect, useState } from "react";
import BasicMenu from "../components/CustomMenu";
import Filters from "../components/Filters";
import Map from "../components/Map";
// import Autocomplete from "react-google-autocomplete";
import {
  checkAndAddDifference,
  createObjWithChecked,
} from "../shared/CommonMethods";
import { BASE_DATA } from "../shared/dataStore/config";
import queryString from "query-string";
import Profile from "./Profile";
import MapEx from "../maps/ex1";
import { Modal, Button } from "antd";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../styles/Main.css";
import axios from "axios";
// import {MyMapWithAutocomplete} from "../components/autocomplete";
function Main() {
  const [filtersData, setFiltersData] = useState(BASE_DATA.FILTERS_DATA);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mapsData, setMapsData] = useState([]);
  const [myLocationAddress, setMyLocationAddress] = React.useState({
    address: "",
    distance: "",
    duration: "",
    mode: "",
  });

  const [destination, setDestination] = React.useState("");

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
    axios
      .get("get-filters")
      .then((res) => {
        console.log(res);
        let filters = JSON.parse(res.data);
        let newArr = filtersData.map((obj) => {
          obj.filters = filters[obj.name];
          obj.filters = createObjWithChecked(obj.filters);
          return obj;
        });
        // console.log(filtersData)
        setFiltersData(newArr);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className="overallWrapper">
      {/* <Profile /> */}
      <div className="heading">
        <h3 className="title">Blood Bank</h3>
        <Avatar
          className="avatar"
          onClick={showModal}
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      </div>
      {/* <Button type="primary" >
        Profile
      </Button> */}
      <Modal
        width={"1100px"}
        title="Edit Profile"
        visible={isModalVisible}
        // onOk={false}
        onCancel={handleCancel}
        footer={null}
      >
        {isModalVisible && <Profile handleCancel={handleCancel} />}
      </Modal>
      <Filters
        setMapsData={setMapsData}
        filtersData={filtersData}
        setFiltersData={setFiltersData}
      />
      {/* {!isModalVisible && <Map />} */}
      {/* <Map /> */}
      {myLocationAddress.address &&
      destination &&
      myLocationAddress.mode &&
      myLocationAddress.distance &&
      myLocationAddress.duration ? (
        <div style={{ justifyContent: "flex-end",display:'grid',gridTemplateColumns:'auto auto',gridColumnGap:'20px' }} className="mapWrapper">
          <div>
            {`${myLocationAddress.address.split(",")[0]} ` }  <b>To</b> {`  ${
              destination.split(",")[0]
            }`}
          </div>
          {/* <br /> */}
          <div>
            <span>
              {" "}
              Distance: <b>{myLocationAddress.distance.text}</b>{" "}
            </span>
            <span>
              {" "}
              Time: <b>{myLocationAddress.duration.text}</b>{" "}
            </span>
          </div>
          {/* {JSON.stringify(myLocationAddress.distance)} */}
        </div>
      ) : (
        ""
      )}
      <MapEx
        myLocationAddress={myLocationAddress}
        setMyLocationAddress={setMyLocationAddress}
        destination={destination}
        setDestination={setDestination}
        setMapsData={setMapsData}
        mapsData={mapsData}
      />
    </div>
  );
}

export default Main;

// userName
// :
// "pavan"
// displayName
// :
// "pavan k"
// googleId
// :
// "109824105737018270268"
// email
// :
// "pavantamidala023@gmail.com"
// emailVerified
// :
// true

// profilePicture
// :
// "https://lh3.googleusercontent.com/a/AATXAJzrUeKlYL-M91GlSndYVzPx7CpK4Nh5ejr2xKZquw=s96-c"
// __v
// :
// 0

// address
// :
// {formatted_address: "Hyderabad, Telangana, India", …}
// bloodGroup
// :
// "A−"
// dob
// :
// "2022-03-16"
// donatedBlood
// :
// true

// donatedBloodCelss
// :
// false

// formatted_address
// :
// "Hyderabad, Telangana, India"
// gender
// :
