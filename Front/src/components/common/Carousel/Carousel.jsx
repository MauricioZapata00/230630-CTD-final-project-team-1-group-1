import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const Carousel = ({ children }) => {
  const totalPages = children.length;

  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  const [itemProps, setItemProps] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(null);
  const [movement, setMovement] = useState(0);
  const [page, setPage] = useState(0);
  const [translate, setTranslate] = useState(0);

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const handleResize = () => setPageWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (pageWidth < 550) {
      const width = pageWidth;
      setItemsPerPage(1);
      setMovement(width - 50);
      setItemProps({ width: `${width - 70}px` });
      return;
    }

    if (pageWidth < 850) {
      const width = pageWidth / 2;
      setItemsPerPage(2);
      setMovement(width - 9);
      setItemProps({ width: `${width - 50}px` });
      return;
    }

    if (pageWidth < 1400) {
      const width = pageWidth / 4;
      setItemsPerPage(4);
      setMovement(width - 22);
      setItemProps({ width: `${width - 43}px` });
      return;
    }

    const width = pageWidth / 4;
    setItemsPerPage(4);
    setMovement(width - 5);
    setItemProps({ width: `${width - 25}px` });
  }, [pageWidth]);

  useEffect(() => {
    setTranslate(movement * page * -1);
    `translateX(${movement * page * -1}px)`;
  }, [movement, page]);

  return itemProps ? (
    <div className="carousel__container">
      <div
        className="carousel"
        style={{ transform: `translate(${translate}px, 0)` }}
      >
        {children.map((item, i) => (
          <div key={`item-${i}`} className="carousel__item" style={itemProps}>
            {item}
          </div>
        ))}
      </div>
      {page > 0 && (
        <div className="carousel__btn carousel__btn--prev" onClick={handlePrev}>
          <ChevronLeftOutlinedIcon />
        </div>
      )}
      {page + itemsPerPage < totalPages && (
        <div className="carousel__btn carousel__btn--next" onClick={handleNext}>
          <ChevronRightOutlinedIcon />
        </div>
      )}
    </div>
  ) : null;
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node.isRequired),
};

export default Carousel;
