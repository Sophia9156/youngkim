import './style/footer.scss';

export default function Footer() {
  const date = new Date();

  return (
    <footer>
      © {date.getFullYear()} young kim. All rights reserved.
    </footer>
  )
}