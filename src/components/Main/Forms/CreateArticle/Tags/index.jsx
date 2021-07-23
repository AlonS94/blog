import React, { useState } from 'react';
import PropTypes from 'prop-types';

import newWrapper from '../../../../../assets/newWrapper';
import './Tags.scss';

const Tags = ({ tags = [], delTag, addTag }) => {
  const [value, setValue] = useState('');

  const allTags = tags.map((tag) => (
    <div className="Tags__inputWrapper Tags__inputWrapper_margin" key={`${tag}`}>
      <input className="Tags__input" type="text" defaultValue={tag} />
      <button onClick={() => delTag(tag)} className="Tags__btnDel Tags__btnDel_margin" type="button">
        Delete
      </button>
    </div>
  ));

  return (
    <>
      <label htmlFor="last" className="Tags__label">
        <span>Tags</span>
        {allTags}
        <div className="Tags__inputWrapper Tags__inputWrapper_margin">
          <input
            onChange={(event) => setValue(event.target.value)}
            className="Tags__input"
            id="last"
            type="text-area"
            placeholder="Tag"
            value={value}
          />
          <button className="Tags__btnDel Tags__btnDel_margin" type="button">
            Delete
          </button>
          <button
            onClick={() => {
              addTag(value);
              setValue('');
            }}
            className="Tags__btnAdd"
            type="button"
          >
            Add tag
          </button>
        </div>
      </label>
    </>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  delTag: PropTypes.func,
  addTag: PropTypes.func,
};

Tags.defaultProps = {
  tags: [],
  delTag: () => {},
  addTag: () => {},
};

export default newWrapper(Tags, ['Tags', 'Tags_margin']);
