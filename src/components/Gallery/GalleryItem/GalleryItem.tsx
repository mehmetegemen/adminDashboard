import moment from "moment";
import React, { FunctionComponent, useRef, useState } from "react";

import "./GalleryItem.scss";

const GalleryItem: FunctionComponent<{
  imgUrl: string,
  imgTitle: string,
  createdAt: Date,
  deleteItemCallback: (index: number) => void,
  changeTitleCallback: (index: number, title: string) => void,
  index: number,
}> = (props) => {
  const {
    imgUrl,
    imgTitle,
    createdAt,
    deleteItemCallback,
    changeTitleCallback,
    index } = props;
  const [state, setState] = useState(
    {
      title: imgTitle,
      titleToggle: false,
    },
  );
  const titleTextbox = useRef(null);
  const deleteItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    deleteItemCallback(index);
  };
  const changeTitle = (event?: React.FormEvent<HTMLInputElement>) => {
    changeTitleCallback(index, state.title);
    setState(
      {
        ...state,
        titleToggle: false,
      },
    );
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setState(
      {
        ...state,
        title: event.currentTarget.value,
      },
    );
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      changeTitle();
    }
  };
  const toggleTitleChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setState(
      {
        ...state,
        titleToggle: !state.titleToggle,
      },
    );
    if (!state.titleToggle) {
      const box = titleTextbox as unknown as React.MutableRefObject<HTMLInputElement>;
      // setState is async so a little bit delay is needed
      setTimeout(() => box.current.select(), 1);
    }
  };
  return (
    <div className="gallery-item">
      <img src={imgUrl}/>
      <div className="gallery-item__content">
        <div className="gallery-item__content__top">
          <input
              type="text"
              onBlur={changeTitle}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={state.title}
              ref={titleTextbox}
              className={state.titleToggle ? "" : "hide"}
          />
          <h4 className={state.titleToggle ? "hide" : ""}>{imgTitle}</h4>
          <div className="gallery-item__content__top__controls">
            <button
              className="gallery-item__content__top__controls__delete"
              aria-label="Delete image"
              title="Delete image"
              onClick={deleteItem}
            >
              <i className="far fa-trash-alt" />
            </button>
            <button
              className="gallery-item__content__top__controls__edit"
              aria-label="Edit image"
              title="Edit image"
              onClick={toggleTitleChange}
            >
              <i className="far fa-edit" />
            </button>
          </div>
        </div>
        <div className="gallery-item__content__info">
          <span>{moment(createdAt).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
