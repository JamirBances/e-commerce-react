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
        <ul>
          {purchase.cart.products.map((purchaseItem) => (
            <Link to={`/products/${purchaseItem.id}`}>
              <li key={purchaseItem.id}>{purchaseItem.title}</li>
            </Link>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default Purchases;
