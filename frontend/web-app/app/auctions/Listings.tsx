"use client";
import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { Auction, PagedResult } from "@/types";
import AppPagination from "../components/AppPagination";
import { getData } from "../actions/auctionActions";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import { shallow } from "zustand/shallow";
import queryString from "query-string";

export default function Listings() {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore((state) => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
  }));

  const setParams = useParamsStore((state) => state.setParams);
  const url = queryString.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber }); // { pageNumber: pageNumber }
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) {
    return <h2 className="text-2xl font-bold text-center mt-10">Loading...</h2>;
  }

  return (
    <>
      <Filters />
      <div className="grid grid-cols-4 gap-6">
        {data.results.map((auction) => (
          <AuctionCard auction={auction} key={auction.id} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <AppPagination
          currentPage={params.pageNumber}
          pageCount={data.pageCount}
          pageChanged={setPageNumber}
        />
      </div>
    </>
  );
}
