import React from "react";

const Image = ({ imageRef, idImage, url, title }) => (
  <li id={idImage} >
    <img className="item-image"  ref={imageRef} src={url} alt={title} />
    <div className="item-title">{title === '' ? 'No Title' : title}</div>
  </li>
);

export default Image;