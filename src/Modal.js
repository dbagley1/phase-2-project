import { useContext, useEffect, useState } from "react";
import { ModalContext } from "./App";
import { ArrowIcon } from "./TwitterIcons";

function Modal(props) {
  const { modalOpen, setModalOpen, modalContent, setModalContent, modalSlides, setModalSlides, modalSlideNumber, setModalSlideNumber } = useContext(ModalContext);

  useEffect(() => {
    setModalContent(
      <img src={modalSlides?.[modalSlideNumber]?.url} />
    );
  }, [modalSlideNumber, modalSlides, setModalContent]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      setModalOpen(false);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      setModalSlideNumber((modalSlideNumber - 1 + modalSlides.length) % modalSlides.length);
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      setModalSlideNumber((modalSlideNumber + 1) % modalSlides.length);
    }
  }

  const handlePrevClick = (e) => {
    e.stopPropagation();
    setModalSlideNumber((modalSlideNumber - 1 + modalSlides.length) % modalSlides.length);
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    setModalSlideNumber((modalSlideNumber + 1) % modalSlides.length);
  };

  return (
    <div className={modalOpen ? 'modal open' : 'modal'} onClick={() => setModalOpen(false)}>
      <button className="slide-controls" onClick={handlePrevClick}>
        <div style={{ transform: 'rotate(180deg)' }}><ArrowIcon /> </div>
      </button>
      <div className="modal-content">
        {modalContent}
      </div>
      <button className="slide-controls" onClick={handleNextClick}>
        <div> <ArrowIcon /> </div>
      </button>
    </div >
  );
}

export default Modal;
