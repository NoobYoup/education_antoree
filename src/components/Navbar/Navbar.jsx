import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import NavButton from './NavButton';
import { useSearch } from '@/contexts/SearchContext.jsx';
import useFavorites from '@/hooks/useFavorites';

import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Navbar() {
    const { search, setSearch } = useSearch();
    const { favoriteIds } = useFavorites();
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <nav className={`${cx('custom-navbar')} navbar navbar-expand-lg`}>
            <div className="container">
                <Link className={`${cx('custom-navbar-brand')} navbar-brand`} to="/">
                    <i className="fa-solid fa-graduation-cap " />
                    Antoree
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="w-100 d-flex flex-column flex-md-row align-items-center justify-content-between">
                        <div className="flex-grow-1 d-flex justify-content-center my-2 my-md-0">
                            <SearchInput value={search} onSearchChange={handleSearchChange} />
                        </div>

                        <div className={cx('nav-actions', 'd-flex', 'justify-content-end', 'mt-2', 'mt-md-0')}>
                            <Link to="/favorite" className="text-decoration-none">
                                <NavButton
                                    iconClass="fa-solid fa-heart"
                                    label="Yêu thích"
                                    badgeCount={favoriteIds.length}
                                    onClick={() => {}}
                                />
                            </Link>
                            <Link to="/history" className="text-decoration-none">
                                <NavButton iconClass="fa-solid fa-clock-rotate-left" label="Lịch sử" badgeCount={0} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
