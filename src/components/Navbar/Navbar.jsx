// components/Navbar/Navbar.jsx
import { useState } from 'react';
import SearchInput from './SearchInput';
import NavButton from './NavButton';

import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Navbar({ onSearch, onShowFavorites }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch?.(e.target.value);
    };

    return (
        <nav className={`${cx('custom-navbar')} navbar navbar-expand-lg`}>
            <div className="container">
                <a className={`${cx('custom-navbar-brand')} navbar-brand`} href="#">
                    <i className="fa-solid fa-graduation-cap " />
                    Antoree
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <SearchInput value={searchTerm} onChange={handleSearchChange} />
                </div>
                <div className={cx('nav-actions')}>
                    <NavButton
                        iconClass="fa-solid fa-heart"
                        label="Yêu thích"
                        badgeCount={3}
                        onClick={onShowFavorites}
                    />
                    <NavButton iconClass="fa-solid fa-clock-rotate-left" label="Lịch sử" badgeCount={0} />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
