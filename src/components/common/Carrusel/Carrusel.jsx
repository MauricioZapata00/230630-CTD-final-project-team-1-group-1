import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const Carrusel = ({ children, partialVisbile = true }) => {
  return (
    <Carousel
      ssr
      partialVisbile={partialVisbile}
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
  partialVisbile: PropTypes.bool,
};

export default Carrusel;
