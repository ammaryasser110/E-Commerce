import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../../store/slices/CartSlice";
import { useState } from "react";
const STRIPE_LINK = "https://buy.stripe.com/test_5kQdRa1FO1CMam9fDLcEw00";

export default function CartDrawer({ open, onClose }) {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [loadingPay, setLoadingPay] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={`cart-drawer ${open ? "open" : ""}`}>
        {/* HEADER */}
        <div className="cart-header">
          <h5>CART</h5>

          <div className="d-flex gap-2">
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => dispatch(clearCart())}
            >
              Clear
            </Button>

            <button className="xbutton" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="cart-body">
          {items.length === 0 ? (
            <p className="text-center mt-4">Cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <Link
                  to={`/product/${item.id}`}
                  className="d-flex gap-2 flex-grow-1 text-decoration-none text-dark"
                  onClick={onClose}
                >
                  <img src={item.thumbnail} />

                  <div>
                    <h6 className="mb-1">{item.title}</h6>
                    <p className="mb-0">LE {item.price}</p>
                  </div>
                </Link>

                <div className="qty">
                  <button
                    className="xbutton"
                    onClick={() => dispatch(decreaseQty(item.id))}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="xbutton"
                    onClick={() => dispatch(increaseQty(item.id))}
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  className="xbutton remove"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="cart-footer">
          <h5>Total: LE {totalAmount.toFixed(2)}</h5>

          <Button
            className="w-100 rounded-0 mt-2"
            variant="dark"
            disabled={items.length === 0 || loadingPay}
            onClick={() => {
              setLoadingPay(true);

              setTimeout(() => {
                window.open(STRIPE_LINK, "_blank");
                setLoadingPay(false);
              }, 800);
            }}
          >
            {loadingPay ? "Redirecting..." : "CHECK OUT"}
          </Button>
        </div>
      </div>
    </>
  );
}
