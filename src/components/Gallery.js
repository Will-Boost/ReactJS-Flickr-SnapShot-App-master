import React from "react";
import NoImages from "./NoImages";
import Image from "./Image";
import { useRef, useCallback, useState, useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Loader from "./Loader";
import Modal from "./Modal";

const Gallery = (props) => {
  const { loading, runSearch } = useContext(PhotoContext);
  const results = props.data;
  const currentSearchTerm = props.searchTerm;
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef();
  const [clearImage, setClearImage] = useState(true);
  const lastImageElementRef = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setClearImage(false);
          setPageNumber((prevPageNumer) => prevPageNumer + 1);
        }
      });
      if (element) observer.current.observe(element);
    }, []
  );

  useEffect(() => {
    setClearImage(true);
    setPageNumber(1);
  }, [currentSearchTerm]);

  useEffect(() => {
    runSearch(currentSearchTerm, pageNumber, clearImage);
  }, [pageNumber]);

  const [imageModal, setImageModal] = useState({image: ''})
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (url) => {
    setImageModal(url);
    setIsOpen(true);
  }

  let images;
  let noImages;
  // map variables to each item in fetched image array and return image component
  if (results.length > 0) {
    images = results.map((image, index) => {
      let farm = image.farm;
      let server = image.server;
      let id = image.id;
      let key = image.id + '_' + index;
      let secret = image.secret;
      let title = image.title;
      let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_w.jpg`;
      if (results.length === index + 1) {
        return (
          <Image
            imageRef={lastImageElementRef}
            url={url}
            key={key}
            title={title}
            // onClick={openModal(url)}
          />
        );
      } else {
        return (
          <Image 
            url={url} 
            key={key} 
            title={title}  
          />
        )
          
      }
    });
  } else {
    noImages = <NoImages />; // return 'not found' component if no images fetched
  }
  return (
    <>
      <div>
        <ul id='list'>{images}</ul>
        {loading ? <Loader /> : null}
        {/* {isOpen ? <Modal url={imageModal} /> : null} */}
        {noImages}
      </div>
    </>
  );
};

export default Gallery;