import React, { useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import AddExpense from "./AddExpense";
import Reports from "./Reports";
import { ChangeLog } from "./ChangeLog";

const Footer = () => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showChangeLogModal, setShowChangeLogModal] = useState(false);
  const [step, setStep] = useState(0); // Manage step here
  const [confirm, setConfirm] = useState(false); // Manage step here

  const toggleModal = () => {
    if (showReportsModal) {
      setShowReportsModal(false);
    } else if (showChangeLogModal) {
      setShowChangeLogModal(false);
    }
    setShowExpenseModal(!showExpenseModal);
    setStep(0); // Reset step whenever modal is toggled
    setConfirm(false);
  };

  const toggleReportsModal = () => {
    if (showExpenseModal) {
      setShowExpenseModal(false);
    } else if (showChangeLogModal) {
      setShowChangeLogModal(false);
    }
    setShowReportsModal(!showReportsModal);
  };

  const toggleChangeLogModal = () => {
    if (showExpenseModal) {
      setShowExpenseModal(false);
    } else if (showExpenseModal) {
      setShowExpenseModal(false);
    }
    setShowChangeLogModal(!showChangeLogModal);
  };

  return (
    <>
      <footer className="footer">
        <div
          className="footer-link footer-item-left"
          onClick={toggleReportsModal}
        >
          <FontAwesomeIcon style={{ color: "orange" }} icon={faChartSimple} />
        </div>
        <div className="footer-link footer-item-center" onClick={toggleModal}>
          <p className="circle">{showExpenseModal ? "×" : "+"}</p>
        </div>
        <div
          className="footer-link footer-item-right"
          onClick={toggleChangeLogModal}
        >
          <FontAwesomeIcon style={{ color: "purple" }} icon={faNoteSticky} />
        </div>
      </footer>
      <Modal isVisible={showExpenseModal} onClose={toggleModal}>
        <AddExpense
          confirm={confirm}
          setConfirm={setConfirm}
          step={step}
          setStep={setStep}
          onClose={toggleModal}
        />{" "}
        {/* Pass closeModal to AddExpense */}
      </Modal>
      <Modal isVisible={showReportsModal} onClose={toggleReportsModal}>
        <Reports />
      </Modal>
      <Modal isVisible={showChangeLogModal} onClose={toggleChangeLogModal}>
        <ChangeLog />
      </Modal>
    </>
  );
};

export default Footer;
