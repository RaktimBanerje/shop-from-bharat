import React from "react";
import styles from "./SearchBar.module.css";
import { Tooltip } from "react-tooltip";

const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <div className={styles.header_input}>
        <input placeholder="Paste Your Link" />
        <button>
          Submit <span className="my-element">?</span>
        </button>
        {
          <Tooltip anchorSelect=".my-element" place="top">
            <div>How it really works...</div>
          </Tooltip>
        }
      </div>
    </div>
  );
};

export default SearchBar;
