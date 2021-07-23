import React from 'react';
import PropTypes from 'prop-types';
import formsWrapper from '../../../../assets/formsWrapper';
import exclamation from '../../../../assets/img/Main/Forms/ModalWindow/exclamation.png';
import './ModalWindow.scss';

const ModalWindow = ({ message, onClickNo, onClickYes }) => (
  <>
    <p className="ModalWindow__message ModalWindow__message_margin">
      <img src={exclamation} alt="" className="ModalWindow__infoIMG" /> <span>{message}</span>
    </p>
    <div className="ModalWindow__a">
      <button className="ModalWindow__btn ModalWindow__btn_non" type="button" onClick={(...args) => onClickNo(args)}>
        No
      </button>
      <button className="ModalWindow__btn ModalWindow__btn_yes" type="button" onClick={(...args) => onClickYes(args)}>
        Yes
      </button>
    </div>
  </>
);

ModalWindow.propTypes = {
  message: PropTypes.string,
  onClickNo: PropTypes.func,
  onClickYes: PropTypes.func,
};

ModalWindow.defaultProps = {
  message: '',
  onClickNo: () => {},
  onClickYes: () => {},
};

export default formsWrapper(ModalWindow, ['ModalWindow']);
