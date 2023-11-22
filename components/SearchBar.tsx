"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { useState } from "react";

const isValidAmazonProductUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.includes("amazon")
    ) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidLink = isValidAmazonProductUrl(searchPrompt);

    if (!isValidLink) {
        alert("Please provide valid amazon link!");
    } 

    try {
        setIsLoading(true);
        const product = await scrapeAndStoreProduct(searchPrompt);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.log(error);
        
    }

  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for products"
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />

      <button type="submit" className="searchbar-btn" disabled={searchPrompt===""}>
        {isLoading ? "Loading..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
