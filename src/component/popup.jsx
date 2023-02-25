import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditeForm from './editeForm';
import React, { useState } from "react";

function Popup(ele) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>edit your food</Modal.Title>
        </Modal.Header>

        <Modal.Body>
           <EditeForm elementfrompopup={ele.ele}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Popup;