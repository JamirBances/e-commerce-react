import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  return (
    <div>
      <h1>Purchases</h1>
      {purchases.map((purchase) => (
        console.log(purchase),
        <ul>
          <Link to={`/products/${purchase.cart.products.id}`}>
            {purchase.cart.products.map((purchaseItem) => (
              <li key={purchaseItem.id}>
                {purchaseItem.title}
              </li>
            ))}
          </Link>
        </ul>
      ))}
    </div>
  );
};

export default Purchases;
