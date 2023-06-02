import React from "react";
import style from "./About.module.scss";
import video from "../../assets/video/about.mp4";

const About = () => {
  return (
    <div className={style.about}>
      <h1 className="heading">About Us</h1>
      <div className={style.row}>
        <div className={style.container_video}>
          <video loop autoPlay muted>
            <source src={video} type="video/mp4" />
          </video>
          <h3>Best online Pharmacy on the market</h3>
        </div>
        <div className={style.content}>
          <h3>Why choose us?</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae,
            aliquid et animi aspernatur quos ducimus. Inventore, aliquam? Optio
            consequuntur sed obcaecati aliquid animi, itaque inventore. Autem
            sunt esse amet dignissimos?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae,
            Autem sunt esse amet dignissimos?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
