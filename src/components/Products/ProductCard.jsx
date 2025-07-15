import { motion } from 'framer-motion';
import { useProductModal } from '@/contexts/ProductModalContext.jsx';
import Button from '@/components/Button/Button';
import classNames from 'classnames/bind';
import cardStyles from './ProductCard.module.scss';
import buttonStyles from '@/components/Button/Button.module.scss';

const cx = classNames.bind(cardStyles);
const cxButton = classNames.bind(buttonStyles);

function ProductCard({ product, isFavorite, toggleFavorite }) {
    const { openModal } = useProductModal();

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
                    <button
                        className={cx('favoriteBtn', { active: isFavorite })}
                        onClick={() => toggleFavorite(product?.id)}
                    >
                        <i className="fas fa-heart" />
                    </button>
                </div>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>{product?.title}</h3>
                    <p className={cx('description')}>{product?.description}</p>
                    <div className={cx('price')}>{product?.price.toLocaleString('vi-VN')}₫</div>
                    <div className={cx('actions')}>
                        <Button
                            className={cxButton('button', 'button-detail')}
                            type="button"
                            onClick={() => openModal(product)}
                        >
                            <i className="fas fa-eye me-2" />
                            Xem chi tiết
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCard;
