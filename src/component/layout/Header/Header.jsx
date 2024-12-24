

//import{ BrowserRouter as Router} from 'react-router-dom';
import {ReactNavbar} from 'overlay-navbar';
import logo from "../../../images/logo.webp";
const options={

burgerColorHover:"goldenrod",
logo,
logoWidth: "16vmax",
navColor1: "black",
logoHoverSize: "10px",
logoHoverColor: "rgb(245,212,129",
link1Text: "Home",
link2Text: "Products",
link3Text: "Contact",
link4Text: "About",
link1Url: "/",
link2Url: "/products",
link3Url: "/contact",
link4Url: "/about",
link1Size: "1.3vmax",
link1Color:"rgb(196,171,109)",
nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgb(196,171,109)",
  searchIconColor: "rgb(196,171,109)",
  cartIconColor: "rgb(196,171,109)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax"

};

function Header() {

  return(
 
 <>
  <ReactNavbar {...options}/>

 
  </>
  );
 }
export default Header;


