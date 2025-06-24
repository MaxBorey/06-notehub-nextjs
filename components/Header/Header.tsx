import css from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={css.header}>
    <Link href="/" aria-label="Home" className={css.logo}>
      <span className={css.logoNote}>Notehub</span>
    </Link>
    <nav aria-label="Main Navigation" role="navigation">
      <ul className={css.navigation}>
        <li>
          <Link  href="/">Home</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
      </ul>
    </nav>
  </header>

  );
};

export default Header;
