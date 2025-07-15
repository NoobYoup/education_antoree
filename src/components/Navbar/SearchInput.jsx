import styles from './SearchInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchInput({ value, onSearchChange }) {
    return (
        <div className={cx('search-container')}>
            <i className={cx('search-icon', 'fas fa-search')} />
            <input
                type="text"
                className={cx('search-input')}
                placeholder="Tìm kiếm tại đây..."
                value={value}
                onChange={onSearchChange}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
        </div>
    );
}

export default SearchInput;
