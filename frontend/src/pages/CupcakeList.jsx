import Cupcake from "@components/Cupcake";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CupcakeList() {
  const [choseCupcake, setChoseCupcake] = useState("");

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/cupcakes").then((response) => {
      setData(response.data);
    });
  }, []);

  const [acces, setAcces] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/accessories").then((response) => {
      setAcces(response.data);
    });
  }, []);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            onChange={(e) => setChoseCupcake(e.target.value)}
          >
            <option value="">---</option>
            {acces.map((accessorie) => (
              <option key={accessorie.id} value={accessorie.id}>
                {" "}
                {accessorie.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {data
          .filter(
            (cupcake) =>
              cupcake.accessory_id === choseCupcake || choseCupcake === ""
          )
          .map((cupcake) => (
            <li className="cupcake-item">
              <Cupcake cupcake={cupcake} key={cupcake.id} />
            </li>
          ))}

        {/* end of block */}
      </ul>
    </>
  );
}
