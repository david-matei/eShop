const Product = require("../models/product");

const searchForProducts = async (req, res) => {
  try {
    const toBeSearched = req.query.search.trim();
    if (toBeSearched.length < 3) {
      throw new Error("Search query must be at least 3 characters long.");
    }

    // doar pentru a vedea cate elemente au fost gasite
    const totalCount = await Product.countDocuments({
      name: { $regex: new RegExp(toBeSearched, "i") },
    });

    const page = req.query.page ? parseInt(req.query.page) : 1;
    // 10 produse pe pagina
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    // daca sunt de exemplu pe pagina 3, voi arata itemele cu index-ul 3-1*10 deci de la 20-29
    // 20-29 pentru ca e limita de 10 produse pe pagina.
    const startIndex = (page - 1) * limit;

    const documents = await Product.find({
      name: { $regex: new RegExp(toBeSearched, "i") },
    })
      .skip(startIndex)
      .limit(limit);
    if (documents.length === 0) {
      throw new Error(" There are no products that match your description! ");
    }
    res.status(200).json({
      ok: true,
      results: documents,
      "Number of documents found": totalCount,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

module.exports = searchForProducts;
