import React, { FunctionComponent, useEffect, useState } from "react";
import ModalComponent from "../modal/Modal";
import { LoadingOutlined } from "@ant-design/icons";
import { IGetDataType, CardProps } from "./interface";
import { Spin } from "antd";
import "./PokemonCard.css";

// abilities: [],
//     base_experience: 0,
//     forms: [],
//     game_indices: [],
//     height: 0,
//     held_items: [],
//     id: 0,
//     is_default: false,
//     location_area_encounters: "",
//     moves: [],
//     name: "",
//     order: 0,
//     past_types: [],
//     species: {},
//     sprites: {},
//     stats: [],
//     types: [],
//     weight: 0,
// type IInferedType<Type = getData> = {
//   [Property in keyof Type]: Type[Property];
// };
const PokemonCard = ({ url }: CardProps) => {
  const [getData, setGetData] = useState<IGetDataType>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, seIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      seIsLoading(true);
      try {
        let response = await fetch(url);
        let resData = await response.json();

        setGetData(resData);
        seIsLoading(false);
      } catch (err) {
        seIsLoading(false);
        console.log(err);
      }
    }
    getData();
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 40,
      }}
      spin
    />
  );

  return (
    <>
      <div className="cardWraper" onClick={handleClick}>
        {!isLoading ? (
          <img src={getData?.sprites?.front_default} alt="pokemon" />
        ) : (
          <Spin indicator={antIcon} />
        )}
        <h3>{getData?.name}</h3>
      </div>

      <ModalComponent
        isModalVisible={isModalOpen}
        setIsModalVisible={setIsModalOpen}
        getData={getData}
      />
    </>
  );
};

export default PokemonCard;
