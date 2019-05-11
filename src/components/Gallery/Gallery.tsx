import React, { FunctionComponent, useState } from "react";
import SideLinedHeading from "../SideLinedHeading/SideLinedHeading";
import GalleryItem from "./GalleryItem/GalleryItem";
import IGalleryItem from "./GalleryItem/IGalleryItem";

import deepCopy from "../../utils/deepCopy";

import "./Gallery.scss";

const Gallery: FunctionComponent<{
  items: IGalleryItem[],
  title: string,
}> = (props) => {
  const { items, title } = props;

  const [ state, setState ] = useState(deepCopy(items));
  const deleteItem = (index: number) => {
    const newState = deepCopy(state).filter(
      (item: any, itemIndex: number) => index !== itemIndex);
    setState(newState);
  };
  const changeTitle = (index: number, title: string) => {
    const newState = deepCopy(state);
    newState[index].imgTitle = title;
    setState(newState);
  };
  const galleryItems = state.map((item: any, index: number) => (
    <GalleryItem
      imgUrl={item.imgUrl}
      imgTitle={item.imgTitle}
      createdAt={item.createdAt}
      deleteItemCallback={deleteItem}
      changeTitleCallback={changeTitle}
      index={index}
      key={index}
    />
  ));
  return (
    <div>
      <SideLinedHeading>{title}</SideLinedHeading>
      <div className="gallery">
        {galleryItems && galleryItems.length !== 0
          ? galleryItems
          : <div className="gallery__warning">No images found</div>}
      </div>
    </div>
  );
};

export default Gallery;
