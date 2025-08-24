import { useState } from "react";
import { createPlant } from "../lib/api.js";

export default function AddPlantPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoriesInput, setCategoriesInput] = useState(""); 
  const [stock, setStock] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    const categories = categoriesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const invalidCategory = categories.find((c) => /^[0-9]+$/.test(c));
    if (invalidCategory) {
      setMsg("Category names must be strings, not numbers.");
      setMsgType("error");
      return;
    }

    if (!name.trim() || !price || categories.length === 0) {
      setMsg("Please fill all required fields.");
      setMsgType("error");
      return;
    }

    try {
      setLoading(true);
      await createPlant({
        name: name.trim(),
        price: Number(price),
        categories,
        stock,
      });
      setMsg("Plant added successfully!");
      setMsgType("success");

      setName("");
      setPrice("");
      setCategoriesInput("");
      setStock(false);
    } catch (e) {
      setMsg(e?.response?.data?.message || "Failed to add plant");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Add Plant</h2>
      <form className="stack gap-12" onSubmit={onSubmit}>
        <label className="stack">
          <span>Name *</span>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Money Plant"
          />
        </label>

        <label className="stack">
          <span>Price (₹) *</span>
          <input
            className="input"
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="299"
          />
        </label>

        <label className="stack">
          <span>Categories (comma-separated) *</span>
          <input
            className="input"
            value={categoriesInput}
            onChange={(e) => setCategoriesInput(e.target.value)}
            placeholder="Indoor, Home Decor"
          />
        </label>

        <label className="row">
          <input
            type="checkbox"
            checked={stock}
            onChange={(e) => setStock(e.target.checked)}
          />
          <span>In Stock</span>
        </label>

        <button className="btn" disabled={loading} type="submit">
          {loading ? "Adding…" : "Add Plant"}
        </button>

        {msg && (
          <p
            className={`font-bold mt-2 ${
              msgType === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}
