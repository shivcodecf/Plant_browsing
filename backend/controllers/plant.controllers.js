import  { Plant } from "../models/plant.model.js";

export const addPlant = async (req, res) => {

  try {

    let { name, price, categories, stock } = req.body;

   
    if (typeof name !== "string" || !name.trim()) {

      return res.status(400).json({ success: false, message: "Name is required" });

    }


    if (price === undefined || isNaN(Number(price)) || Number(price) <= 0) {

      return res.status(400).json({ success: false, message: "Price must be a number > 0" });

    }

    
    if (!Array.isArray(categories) || categories.length === 0) {

      return res.status(400).json({ success: false, message: "Categories must be a non-empty array" });

    }
    categories = categories
      .map((c) => (typeof c === "string" ? c.trim() : ""))
      .filter((c) => c.length > 0);

    if (categories.length === 0) {

      return res.status(400).json({ success: false, message: "Categories cannot be empty" });

    }

    
    const doc = await Plant.create({
      name: name.trim(),
      price: Number(price),
      categories,
     
      ...(typeof stock === "boolean" ? { stock } : {})
    });

    return res.status(201).json({
      success: true,
      message: "New plant created successfully",
      data: doc,
    });
  } catch (err) {
    console.error("addPlant error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }


};



export const getPlants = async (req, res) => {

  try {
    const {
      search = "",
      category,
      available,
      page = "1",
      limit = "20",
      sort = "name_asc",
    } = req.query;

    const filter = {};

  
    if (typeof search === "string" && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [{ name: regex }, { categories: regex }];
    }

    
    if (typeof category === "string" && category.trim()) {
      filter.categories = category.trim();
    }

   
    if (available === "true") filter.stock = true;
    if (available === "false") filter.stock = false;

    
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 50);
    const skip = (pageNum - 1) * limitNum;

    
    const sortMap = {
      name_asc: { name: 1 },
      name_desc: { name: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      created_desc: { createdAt: -1 },
      created_asc: { createdAt: 1 },
    };
    
    const sortObj = sortMap[sort] || sortMap.name_asc;

   
    const [items, total] = await Promise.all([
      Plant.find(filter).sort(sortObj).skip(skip).limit(limitNum).lean(),
      Plant.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      message: "Plants fetched successfully",
      data: items,
      page: pageNum,
      limit: limitNum,
      total,
    });
  } catch (err) {
    console.error("getPlants error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};