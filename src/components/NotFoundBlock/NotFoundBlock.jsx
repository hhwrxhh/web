import React from "react";
import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1 data-testid="not_found">
        Not Found
        <br />
        Sorry, but this page does not exist
      </h1>
    </div>
  );
}

export default NotFoundBlock;
