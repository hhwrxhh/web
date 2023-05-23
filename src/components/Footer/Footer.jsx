import "./footer.scss";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-column">
        <h3>Locations</h3>
        <ul>
          <li>Town 1</li>
          <li>Town 2</li>
          <li>Town 3</li>
          <li>Town 4</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Contacts</h3>
        <ul>
          <li>Town 1, Country 1, 38900</li>
          <li>Pharmacy@gmail.com</li>
          <li>555-100-333</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Common questions</h3>
        <ul>
          <li>
            <a href="$" className="">
              About Company
            </a>
          </li>
          <li>
            <a href="$" className="">
              delivery
            </a>
          </li>
          <li>
            <a href="$" className="">
              Payment
            </a>
          </li>
          <li>
            <a href="$" className="">
              Certifications
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
