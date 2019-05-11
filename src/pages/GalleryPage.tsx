import React, { FunctionComponent } from "react";
import Gallery from "../components/Gallery/Gallery";

import "./GalleryPage.scss";

const galleryObjects = [
  {
    createdAt: new Date("04-29-2019"),
    imgTitle: "Some Image",
    imgUrl: "https://placeimg.com/640/480/animals",
  },
  {
    createdAt: new Date("04-22-2019"),
    imgTitle: "Other Image",
    imgUrl: "https://placeimg.com/640/480/arch",
  },
  {
    createdAt: new Date("04-18-2019"),
    imgTitle: "Another Image",
    imgUrl: "https://placeimg.com/640/480/nature",
  },
  {
    createdAt: new Date("04-11-2019"),
    imgTitle: "And other Image",
    imgUrl: "https://placeimg.com/640/480/people",
  },
  {
    createdAt: new Date("04-2-2019"),
    imgTitle: "Oh other Image",
    imgUrl: "https://placeimg.com/640/480/tech",
  },
];

const GalleryPage: FunctionComponent = (props) => {
  return (
    <div className="gallery-page">
      <Gallery items={galleryObjects} title="Mixed Images" />
    </div>
  );
};

export default GalleryPage;
