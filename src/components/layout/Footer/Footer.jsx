import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__copyright">
        &copy; 2023 - Servicios de Catering
      </div>
      <div className="footer__social">
        <IconButton
          sx={{ color: "white" }}
          aria-label="facebook"
          component="label"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          sx={{ color: "white" }}
          aria-label="linkedin"
          component="label"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          sx={{ color: "white" }}
          aria-label="twitter"
          component="label"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          sx={{ color: "white" }}
          aria-label="twitter"
          component="label"
        >
          <InstagramIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
