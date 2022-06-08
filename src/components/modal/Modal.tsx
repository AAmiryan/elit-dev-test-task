import { Button, Modal } from "antd";
import React, { useState, FC } from "react";

interface ModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  getData: any;
}

const ModalComponent = ({
  isModalVisible,
  setIsModalVisible,
  getData,
}: ModalProps) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={`Pokemon ${getData?.name} description`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {getData?.name && (
          <>
            <img src={getData?.sprites?.front_default} alt={getData?.name} />
            <p>Species: {getData?.species?.name} </p>
            <p>Stats: {getData?.stats[0]?.base_stat} </p>
            <p>Types: {getData?.types[0]?.type.name}</p>
            <p>Weight: {getData?.weight} </p>
            <p>Moves: {getData?.moves[0]?.move.name} </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalComponent;
