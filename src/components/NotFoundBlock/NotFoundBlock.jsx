import React from "react";
import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        Not Found
        <br />
        Sorry, but this page does not exit
      </h1>
    </div>
  );
}

export default NotFoundBlock;
