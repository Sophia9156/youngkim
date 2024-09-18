import "./style/footer.scss";

const Footer: React.FC = () => {
  const date = new Date();

  return (
    <footer>© {date.getFullYear()} young kim. All rights reserved.</footer>
  );
};

export default Footer;
