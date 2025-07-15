import { motion } from 'framer-motion';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ product, onViewDetail }) {
    return (
        <motion.div
            className="col-lg-3 col-md-6 col-sm-12 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={cx('card')}>
                <div className={cx('imageWrapper')}>
                    <img src={product?.thumbnail} alt={product?.title} className={cx('image')} />
                    <button className={cx('favoriteBtn')}>
                        <i className="fas fa-heart" />
                    </button>
                </div>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>{product?.title}</h3>
                    <p className={cx('description')}>{product?.description}</p>
                    <div className={cx('price')}>{product?.price.toLocaleString('vi-VN')}₫</div>
                    <div className={cx('actions')}>
                        <button className={cx('btnDetail')} onClick={() => onViewDetail(product)}>
                            <i className="fas fa-eye me-2" />
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCard;
