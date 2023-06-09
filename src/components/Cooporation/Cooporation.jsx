import style from "./Cooporation.module.scss";
import brand from "../../assets/img/brand.png";


const Cooporation = () => {
  let arr = new Array(6).fill(brand);
  console.log(arr);
  return (
    <div className="cooporation">
      <h3 className="heading">BRANDS</h3>
      <div className={style.cooporation__row}>
        {arr.map((item, index) => (
          <div key={index} className={style.cooporation__element}>
            <img src={item} alt="BRAND" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cooporation;
