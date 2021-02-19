import React from 'react';

import overlay from '../../assets/images/card-overlay.svg';

import './HomePageCard.css';

const HomePageCard = ({ text, subText, image, onBtnClick = () => {} }) => (
  <section className="w-1/2 p-16 pl-0 mr-4 rounded bg-white flex justify-center relative">
    <img
      src={overlay}
      alt="fancy"
      className="absolute top-0 left-0 w-1/2 z-0"
    />
    <div className="px-16">
      <img src={image} alt={text} />
    </div>
    <div className="flex flex-col justify-center z-10">
      <h3 className="text-2xl font-bold">{text}</h3>

      <p className="my-4">{subText}</p>

      <span>
        <button className="btn-primary" onClick={onBtnClick}>
          Getting tested
        </button>
      </span>
    </div>
  </section>
);

export default HomePageCard;
