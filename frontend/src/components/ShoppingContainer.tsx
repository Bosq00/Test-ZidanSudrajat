import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItems, itemsSelector } from "../features/itemsSlice";
import { useAppDispatch } from "../redux/hook";
import ShoppingItems from "./ShoppingItems";

const ShoppingContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const items = useSelector(itemsSelector.selectAll);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const uniqueCategories = Array.from(
    new Set(items.map((item) => item.category))
  );

  const categories = ["all", ...uniqueCategories];
  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-24">
      <div className="mb-4">
        <span className="mr-2">Category:</span>
        <div className="flex gap-4">
          {categories.map((category) => (
            <label key={category} className="inline-flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="form-radio"
              />
              <span className="ml-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ShoppingItems key={item.id} item={item} />
          ))
        ) : (
          <p>No items available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingContainer;
