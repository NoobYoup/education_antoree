import styles from './NavButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NavButton({ iconClass, label, badgeCount, onClick }) {
    return (
        <a href="#" className={cx('nav-btn')} onClick={onClick}>
            <i className={iconClass} />
            <span className="d-none d-md-inline ms-1">{label}</span>
            {badgeCount > 0 && <span className={cx('cart-badge')}>{badgeCount}</span>}
        </a>
    );
}

export default NavButton;
