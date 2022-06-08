import React, { FunctionComponent, useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import PokemonCard from "../card/PokemonCard";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Input } from "antd";
import { IDataTypes } from "./interface";
import "antd/dist/antd.css";
import "./Pagination.css";

const PaginationMain: FunctionComponent = () => {
  const [current, setCurrent] = useState<number>(1);
  const [ofset, setOfset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<IDataTypes>({
    count: 0,
    next: "",
    previous: null,
    results: [],
  });

  const { Search } = Input;

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 100,
      }}
      spin
    />
  );

  async function getData() {
    try {
      setIsLoading(true);
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${ofset}&limit=15`
      );
      let resData = await response.json();

      setData(resData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, [ofset]);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
    setOfset((prev) => prev + 15);
  };

  const onSearch = (value: string): void => {
    if (value.length >= 3) {
      let searchData = data?.results.filter((item) =>
        item?.name.includes(value)
      );
      if (searchData) {
        setData({
          ...data,
          results: searchData,
        });
      }
    }
    if (value === "") {
      getData();
    }
  };

  return (
    <div className="container">
      <Search
        className="searchStyle"
        placeholder="Pokemon name"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      {!isLoading ? (
        <div>
          {data?.results.map((item: { name: string; url: string }) => (
            <PokemonCard url={item.url} key={item.url} />
          ))}
        </div>
      ) : (
        <Spin indicator={antIcon} />
      )}
      <div className="paginationContainer">
        <Pagination
          current={current}
          onChange={onChange}
          total={data?.count}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default PaginationMain;
