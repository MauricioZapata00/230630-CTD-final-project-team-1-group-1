import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PropTypes from "prop-types";

import "photoswipe/style.css";

const ImageGallery = ({ galleryID, images }) => {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, [galleryID]);

  return (
    <div className="pswp-gallery" id={galleryID}>
      <div className="product-detail__image-grid">
        {images.map((image, index) => (
          <a
            href={image.url}
            data-pswp-width={image.width}
            data-pswp-height={image.height}
            key={galleryID + "-" + index}
            target="_blank"
            rel="noreferrer"
            className={`${index === 0 ? "product-detail__main-image" : ""}`}
          >
            <img src={image.url} alt="" />
          </a>
          /* <div className="product-detail__image-grid">
        <img className="product-detail__main-image" src={imagenUrl} alt="" />
        <img
          src={imagenUrl}
          className="product-detail__image-selected"
          alt=""
        />
        <img
          src="https://www.cgmiami.org/wp-content/uploads/2022/07/1658328558_catchy-catering-company-names-1024x682.jpg"
          alt=""
        />
        <img
          src="https://cdn0.casamientos.com.ar/vendor/9059/3_2/960/jpeg/processed-881be620-6327-4a62-af51-2f777c6e6340-9hxm7mfx_7_159059-163484209376997.jpeg"
          alt=""
        />
        <img
          src="https://definicion.de/wp-content/uploads/2016/08/catering-1.jpg"
          alt=""
        />
      </div> */
        ))}
      </div>
    </div>
  );
};

ImageGallery.propTypes = {
  galleryID: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ImageGallery;
