import React, { useContext } from 'react';
import TextTruncate from 'react-text-truncate';
import CartContext from '../../context/cart/cartContext';
import AlertContext from '../../context/alert/alertContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { products, addToCart } = useContext(CartContext);
  const { setAlert } = useContext(AlertContext);

  const alreadyAdded = products.filter(pd => pd._id === product._id).length > 0;

  const onClick = () => {
    if (!alreadyAdded) {
      return addToCart(product);
    }
    setAlert('You already added this to the cart', 'info');
  };

  return (
    <div className='card'>
      <div className='product-img'>
        <img src={`/img/products/${product.image}`} alt='product' />
      </div>
      <div className='product-desc'>
        <span className='price'>{product.price} Ks</span>
        <p className='name'>{product.name}</p>
        <p className='description'>
          <TextTruncate line={3} text={product.description} />
        </p>
        <a
          href='#!'
          className={`add-cart ${alreadyAdded && 'already-added'}`}
          onClick={onClick}
        >
          {alreadyAdded ? 'Added to cart' : 'Add to cart'}
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
