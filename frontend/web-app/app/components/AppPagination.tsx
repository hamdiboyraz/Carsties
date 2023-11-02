"use client";
import { Pagination } from "flowbite-react";
import React, { useState } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function AppPagination({ currentPage, totalPages }: Props) {
  const [pageNumber, setPageNumber] = useState(currentPage);

  return (
    <Pagination
      currentPage={pageNumber}
      onPageChange={(e) => setPageNumber(e)}
      totalPages={totalPages}
      layout="pagination"
      showIcons={true}
      className="text-blue-500 mb-5"
    />
  );
}
