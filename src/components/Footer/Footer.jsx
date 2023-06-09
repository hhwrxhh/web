import React from "react";
import "./footer.scss";

const locations = ["Town 1", "Town 2", "Town 3", "Town 4"];
const contacts = [
  "Town 1, Country 1, 38900",
  "Pharmacy@gmail.com",
  "555-100-333",
];

const commonQuestions = [
  { title: "About Company", url: "/" },
  { title: "Delivery", url: "/" },
  { title: "Payment", url: "/" },
  { title: "Certifications", url: "/" },
];

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-column">
        <h3>Locations</h3>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
      </div>
      <div className="footer-column">
        <h3>Contacts</h3>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>{contact}</li>
          ))}
        </ul>
      </div>
      <div className="footer-column">
        <h3>Common questions</h3>
        <ul>
          {commonQuestions.map((question, index) => (
            <li key={index}>
              <a href={question.url} className="">
                {question.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
