import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ children, onClick, className, type = 'button', ...props }) {
    return (
        <button className={className} onClick={onClick} type={type} {...props}>
            {children}
        </button>
    );
}

export default Button;
