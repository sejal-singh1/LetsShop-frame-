/* eslint-disable react/prop-types */

import './Cart.css';
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from 'react-router-dom';

import { addItemsToCart,removeItemsFromCart } from '../../actions/cartAction';
import { useDispatch } from 'react-redux';


const CartItemCard = ({ item }) => {
const dispatch=useDispatch();


    const increaseQuantity = (id, quantity) => {
        const newQty = quantity + 1;
        if (5<= quantity) {
          return;
        }
  dispatch(addItemsToCart(id,newQty));
      };

      const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        dispatch(addItemsToCart(id,newQty));
        
      };

const deleteCardItem=(id)=>{
  dispatch(removeItemsFromCart(id));
};


  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <img src={item.image || "https://via.placeholder.com/100"} alt={item.name} className="cart-item-image" />
        <div className="cart-item-info">
          <Link to={`/product/${item.product}`} className="cart-item-title">{item.name}</Link>
        </div>
      </div>
      <div className="cart-item-actions">
        <div className="cart-item-quantity-wrapper">
        <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
        </div>
        <div className="cart-item-price-wrapper">
          <span className="cart-item-price">{`₹${item.price}`}</span>
        </div>
        <div className="cart-item-total-wrapper">
          <span className="cart-item-total">{`₹${item.price * item.quantity}`}</span>
        </div>
      </div>
      <div className="cart-item-remove-wrapper">
        <DeleteIcon onClick={() => deleteCardItem(item.product)} className='cart-item-remove' />
      </div>
    </div>
  );
};

export default CartItemCard;
