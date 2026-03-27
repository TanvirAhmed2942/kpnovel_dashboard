"use client";
import React from "react";
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import BookTable from "./BookTable";
import ChaptersTable from "./ChaptersTable";

function ContentModerationLayout() {
  const search = {
    placeholder: "Search",
    value: "",
    onChange: (value: string) => {
      console.log(value);
    },
  };
  const selects = [
    {
      placeholder: "Select",
      options: ["Option 1", "Option 2", "Option 3"],
      value: "",
      onValueChange: (value: string) => {
        console.log(value);
      },
    },
  ];
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Content Moderation"
        description="Manage your content moderation"
      />
      <FilterSearch search={search} selects={selects} />
      <BookTable />
      <ChaptersTable />
    </div>
  );
}

export default ContentModerationLayout;
