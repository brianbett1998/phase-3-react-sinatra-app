import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-content mt-5">
        <h1 className="header-content__title">Find perfect rides that fit</h1>
        <p className="header-content__desc">
          The best offers for you at any point of your journey.
          Classy rides that meet your taste.
        </p>
        <nav className="header-nav">
          <ul className="header-nav__list">
            <li className="header-nav__item"><a href="/">Home</a></li>
            <li className="header-nav__item"><a href="/about">About</a></li>
            <li className="header-nav__item"><a href="/contacts">Contacts</a></li>
            <li className="header-nav__item"><a href="/exit">Exit</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
