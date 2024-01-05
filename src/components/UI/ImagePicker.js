import React from "react";
import classes from "./ImagePicker.module.scss";
const ImagePicker = ({ images, selectedImage, onSelect }) => {
  return (
    <div className={classes["image-picker"]}>
      <p>Select an image</p>
      <ul>
        {images.map((image) => (
          <li
            key={image.path}
            onClick={() => onSelect(image.path)}
            className={selectedImage === image.path ? "selected" : undefined}
          >
            <img
              src={`http://localhost:4000/${image.path}`}
              alt={image.caption}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImagePicker;
