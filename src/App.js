import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";
import "antd/dist/antd.css";
import BasicMenu from "./components/CustomMenu.jsx";
import Main from "./pages/Main";
import { GoogleLogin } from "react-google-login";
// import "semantic-ui-css/semantic.min.css";
function App() {
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div className="App">
      <Main />
      {/* <GoogleLogin
        clientId="231706380108-000lt4sfoectqmim4vp7se0mhj8kgv5n.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      /> */}
      ,
    </div>
  );
}

export default App;
