import React from "react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { removeFromDb } from "../../utilities/fakedb";

import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Orders = () => {
  const [products] = useProducts();
  const [cart, setCart] = useCart(products);
  const handleRemove = (product) => {
    const rest = cart.filter((pd) => pd.key !== product.key);
    setCart(rest);
    removeFromDb(product.key);
  };

  return (
    <div className="shop-container">
      {cart.length > 0 ? (
        <div className="product-container">
          {cart.map((product) => (
            <ReviewItem
              product={product}
              key={product.id}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-xl text-slate-800 m-5 p-2">
            No Product added to the cart
          </h3>
        </div>
      )}
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/inventory">
            <button className="btn-regular"> Proceed Order</button>{" "}
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
