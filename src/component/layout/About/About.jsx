
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/singh_sejal.21/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="c:\Users\SEJAL\Pictures\WhatsApp Image 2024-08-11 at 16.06.32_4a70a4c3.jpg"
              alt="Founder"
            />
            <Typography>Sejal Singh</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @sejalsingh. 
            </span>
          </div>
        
            
          </div>
        </div>
      </div>
    
  );
};

export default About;