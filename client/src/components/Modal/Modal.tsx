import ReservationForm from "../ReservationForm/ReservationForm";
import "./Modal.css";

const Modal = ({ closeModal, roomNumber, handleSubmit }) => {
  return (
    <>
      <div
        className="modal-overlay"
        onClick={() => {
          closeModal();
        }}
      ></div>
      <div className="modal-body">
        <ReservationForm
          roomNumber={roomNumber}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Modal;
