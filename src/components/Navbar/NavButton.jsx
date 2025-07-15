import PropTypes from 'prop-types';
import styles from './NavButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NavButton({ iconClass, label, badgeCount = 0, onClick }) {
    return (
        <a href="#" className={cx('nav-btn')} onClick={onClick}>
            <i className={iconClass} />
            <span className="d-none d-md-inline ms-1">{label}</span>
            {badgeCount > 0 && <span className={cx('cart-badge')}>{badgeCount}</span>}
        </a>
    );
}

NavButton.propTypes = {
    iconClass: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    badgeCount: PropTypes.number,
    onClick: PropTypes.func,
};

export default NavButton;
