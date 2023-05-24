import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const Carrusel = ({ children }) => {
  return (
    <Carousel
      ssr
      partialVisible
      deviceType="desktop"
      itemClass="image-item"
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
};

Carrusel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Carrusel;
