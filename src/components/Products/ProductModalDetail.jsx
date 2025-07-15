import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames/bind';
import styles from './ProductModalDetail.module.scss';

const cx = classNames.bind(styles);

function ProductModalDetail({ isOpen, onClose, product }) {
    // xử lý tắt modal bằng phím ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && product && (
                <motion.div
                    className={cx('overlay')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={cx('modal')}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()} // ngăn tắt modal khi click vào modal
                    >
                        <button className={cx('closeBtn')} onClick={onClose}>
                            <i className="fas fa-times" />
                        </button>

                        <div className={cx('content')}>
                            <div className={cx('image')}>
                                <img src={product.thumbnail} alt={product.title} />
                            </div>
                            <div className={cx('info')}>
                                <h2>{product.title}</h2>
                                <p className={cx('description')}>{product.description}</p>
                                <p className={cx('price')}>Giá: {product.price.toLocaleString('vi-VN')}₫</p>
                                <p className={cx('rating')}>
                                    Đánh giá: <i className="fa-solid fa-star"></i> {product.rating} / 5
                                </p>

                                <button className={cx('likeBtn')}>
                                    <i className="fas fa-heart me-2"></i> Yêu thích
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ProductModalDetail;
