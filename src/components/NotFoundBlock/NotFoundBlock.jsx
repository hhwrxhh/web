import React from "react";
import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <pre>404</pre>
        Not Found
        <br />
        Sorry, but this page does not exist
      </h1>
    </div>
  );
}

export default NotFoundBlock;
