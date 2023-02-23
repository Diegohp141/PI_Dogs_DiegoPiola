import React from "react";

export default function SearchBar() {
  return (
    <div>
      <div>
        <p>Order by</p>
        <select>
          <option value="Asc">Name: A-Z</option>
          <option value="Desc">Name: Z-A</option>
          <option value="Min">Min/Max Weight</option>
          <option value="Max">Max/Min Weight</option>
        </select>
      </div>
      <div>
        <p>Filter by</p>
        <select>
          <option value="AllD">All dogs</option>
          <option value="Api">Api</option>
          <option value="Db">DataBb</option>
        </select>
        <select>
          <option value="AllT">All dogs</option>
        </select>
      </div>
    </div>
  );
}
