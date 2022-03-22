import React, { useState, useEffect } from "react";
// import { Dropdown } from "semantic-ui-react";
import { Form, Radio, Dropdown } from "semantic-ui-react";
import Autocomplete from "react-google-autocomplete";
import "../styles/Profile.css";
// import {
//   BLOOD_GROUP,
//   BLOOD_CELLS,
//   LAST_3_MONTHS_DONATED,
//   AGE_GROUP,
//   GENDER,
// } from "../shared/constants";
import { DatePicker, Space } from "antd";
import axios from "axios";
let bloodGroupTypes = ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"];
let friendOptions = [
  {
    key: "Jenny Hess",
    text: "Jenny Hess",
    value: "Jenny Hess",
    // image: {
    //   avatar: false,
    //   //   src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    //   src: "",
    // },
  },
];
function Profile() {
  const [donatedBloodCelss, setDonatedBloodCells] = useState(null);
  const [donatedBlood, setDonatedBlood] = useState(null);
  const [gender, setgenderChange] = useState(null);
  const [dob, setDob] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [address, setAddress] = useState({
    formatted_address: "",
    place_id: "",
    lat: "",
    lng: "",
  });
  const [bloodGroup, setBloodGroup] = useState("");
  useEffect(() => {
    friendOptions = bloodGroupTypes.map((val) => {
      return {
        key: val,
        text: val,
        value: val,
      };
    });
  }, []);
  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => {
        console.log(JSON.parse(res.data));
        let data = JSON.parse(res.data);
        setUserDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleChange(e, { value }) {
    setDonatedBloodCells(value === "Yes" ? true : false);
  }

  function donatedBloodChange(e, { value }) {
    setDonatedBlood(value === "Yes" ? true : false);
  }
  function genderChange(e, { value }) {
    setgenderChange(value);
  }
  function dobChange(date, dateString) {
    console.log(date, dateString);
    setDob(dateString);
  }
  function bloodGroupChange(e, { value }) {
    setBloodGroup(value);
  }
  function getValues() {
    let payload = {
      donatedBloodCelss,
      donatedBlood,
      gender,
      dob,
      address,
      bloodGroup,
      id: userDetails.id,
    };
    let req = {
      method: "PUT",
      url: "/user-details",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(payload),
    };

    axios
      .put("/user-details", req)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(payload);
  }

  return (
    <div className="profileContainer">
      <div className="profileHeading">
        {/* <h3 style={{ fontWeight: "bold" }}>Edit Profile</h3> */}
      </div>
      <div className="profileInputs">
        <div className="blood-form">
          <Form.Field> Blood Group : </Form.Field>{" "}
          <Dropdown
            onChange={bloodGroupChange}
            value={bloodGroup}
            placeholder="Select Your Blood Group"
            fluid
            selection
            options={friendOptions}
          />
        </div>
        <div className="bloodCells">
          <Form className="blood-form">
            <Form.Field className="bloodcell-label">
              Donated Blood Cells in last 12 days :
            </Form.Field>
            {/* <div className="blood-wrapper"> */}
            <Form.Field className="">
              <Radio
                label="Yes"
                name="radioGroup"
                value="Yes"
                checked={donatedBloodCelss === true}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="No"
                name="radioGroup"
                value="No"
                checked={
                  donatedBloodCelss !== true && donatedBloodCelss !== null
                }
                onChange={handleChange}
              />
            </Form.Field>
            {/* </div> */}
          </Form>
        </div>
        <div className="bloodDonated">
          <Form className="blood-form">
            <Form.Field>Donated Blood in last 3 months :</Form.Field>
            {/* <div className="blood-wrapper"> */}
            <Form.Field>
              <Radio
                label="Yes"
                name="radioGroup"
                value="Yes"
                checked={donatedBlood === true}
                onChange={donatedBloodChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="No"
                name="radioGroup"
                value="No"
                checked={donatedBlood !== true && donatedBlood !== null}
                onChange={donatedBloodChange}
              />
            </Form.Field>
            {/* </div> */}
          </Form>
        </div>
        <div className="gender">
          <Form className="blood-form">
            <Form.Field>Gender :</Form.Field>
            {/* <div className="blood-wrapper"> */}
            <Form.Field>
              <Radio
                label="Male"
                name="radioGroup"
                value="Male"
                checked={gender === "Male"}
                onChange={genderChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Female"
                name="radioGroup"
                value="Female"
                checked={gender === "Female"}
                onChange={genderChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Others"
                name="radioGroup"
                value="Others"
                checked={gender === "Others"}
                onChange={genderChange}
              />
            </Form.Field>
            {/* </div> */}
          </Form>
        </div>
        <div className="blood-form">
          <Form.Field> Address : </Form.Field>
          {/* <Autocomplete
            apiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => {
              setAddress((val) => {
                return {
                  formatted_address: place.formatted_address,
                  place_id: place.place_id,
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                };
              });
            }}
          /> */}
        </div>
        <div className="blood-form">
          <Form.Field> Date of Birth : </Form.Field>{" "}
          <DatePicker onChange={dobChange} />
        </div>
      </div>
      <div className="submit-btn">
        <button
          onClick={getValues}
          style={{ width: "175px" }}
          className="positive ui button"
        >
          {" "}
          Submit
        </button>
      </div>
    </div>
  );
}

export default Profile;
