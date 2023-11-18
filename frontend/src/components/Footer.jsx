import "../styles/Footer.scss"

const Footer = () => {
  return (
    <footer name = "footer">
      <span className="footerspan">
        Authors:
        <br/> Gayathri Manoj: &ensp; <a className = "anchor" href = "https://github.com/GayathriManoj2003" > https://github.com/GayathriManoj2003</a>
        <br/> R.S. Moumitha : &ensp;  <a className = "anchor" href = "https://github.com/Moumitha120104" > https://github.com/Moumitha120104</a>
      </span>
      <span className="footerspan">
        GitHub Repo: &ensp; <a className = "anchor" href="https://github.com/GayathriManoj2003/Inventory-Management-System"> https://github.com/GayathriManoj2003/Inventory-Management-System</a>
      </span>
    </footer>
  );
};

export default Footer;