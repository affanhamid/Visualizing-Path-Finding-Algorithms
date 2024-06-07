import React from "react";
import "./Modal.css";
import { useState } from "react";

const ModalControls = ({ setPageNum, setOpenModal }) => {
  return (
    <div className="modal_controls">
      <div onClick={() => setPageNum((num) => (num > 1 ? num - 1 : num))}>
        {"<"}
      </div>
      <div
        onClick={() =>
          setPageNum((num) => {
            if (num < 3) {
              return num + 1;
            } else {
              setOpenModal(false);
              return num;
            }
          })
        }
      >
        {">"}
      </div>
    </div>
  );
};

const ModalPage1 = ({ setPageNum, setOpenModal }) => {
  return (
    <div className="modal_page">
      <h1>Welcome to Visual Pathfinding Algorithms!</h1>
      <h2>
        This interactive application demonstrates various pathfinding algorithms
        by animating their execution on a grid.
      </h2>
      <p>
        In this project, you'll have the opportunity to visualize how different
        algorithms explore the grid to find the shortest path from a start point
        to an end point. The grid represents a map where each cell can either be
        an open space or a wall, challenging the algorithms to navigate around
        them.
      </p>
      <ModalControls setPageNum={setPageNum} setOpenModal={setOpenModal} />
    </div>
  );
};

export const NodeType = ({ type, text }) => {
  return (
    <div>
      <div
        className={`node ${type}`}
        style={{
          width: 30,
          height: 30,
        }}
      ></div>
      <div>{text}</div>
    </div>
  );
};

const ModalPage2 = ({ setPageNum, setOpenModal }) => {
  return (
    <div className="modal_page">
      <h1>Legend</h1>
      <p className="legend">
        <NodeType type="start" text="This is the Start Node" />
        <NodeType type="end" text="This is the End Node" />
        <NodeType type="visited" text="This is a Node that has been visited" />
        <NodeType
          type="shortestPath"
          text="This is a Node that is part of the shortest path"
        />
      </p>
      <ModalControls setPageNum={setPageNum} setOpenModal={setOpenModal} />
    </div>
  );
};

const ModalPage3 = ({ setPageNum, setOpenModal }) => {
  return (
    <div className="modal_page">
      <h1>Controls</h1>
      <p className="legend">
        <div>
          <span>s</span> <span>Move start node to cursor position</span>
        </div>
        <div>
          <span>e</span> <span>Move end node to cursor position</span>
        </div>
        <div>
          <span>w</span> <span>Click and drag cursor to draw walls</span>
        </div>
        <div>
          <span>r</span> <span>Click and drag cursor to remove walls</span>
        </div>
        <div>
          <span>
            <b>Press the same button again to exit the mode</b>
          </span>
        </div>
      </p>
      <ModalControls setPageNum={setPageNum} setOpenModal={setOpenModal} />
    </div>
  );
};

const Modal = ({ setOpenModal }) => {
  const [pageNum, setPageNum] = useState(1);
  return (
    <div className="modal_container">
      {pageNum === 1 ? (
        <ModalPage1 setPageNum={setPageNum} setOpenModal={setOpenModal} />
      ) : (
        ""
      )}
      {pageNum === 2 ? (
        <ModalPage2 setPageNum={setPageNum} setOpenModal={setOpenModal} />
      ) : (
        ""
      )}
      {pageNum === 3 ? (
        <ModalPage3 setPageNum={setPageNum} setOpenModal={setOpenModal} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Modal;
