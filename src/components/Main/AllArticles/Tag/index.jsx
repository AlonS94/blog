import React from 'react';
import './Tag.scss';

const Tag = ({ tagList = [] }) => {
  const tags = tagList.map((elem) => (
    <span key={elem} className="Tag Tag_margin">
      {elem}
    </span>
  ));

  return tags;
};

export default Tag;
