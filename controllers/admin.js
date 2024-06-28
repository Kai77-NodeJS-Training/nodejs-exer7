const { ObjectId } = require("mongodb");
const Product = require("../models/product");
const User = require("../models/user");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userId = await User.findOne({ username: "justin" });

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: userId._id
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  console.log("getEditProduct", editMode);
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  console.log("prodId", prodId);

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const updatedData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.body.productId, updatedData, { new: true, runValidators: true });

    if (!updatedProduct) {
      console.log("PRODUCT NOT FOUND!");
      res.redirect("/admin/products");
    } else {
      console.log("PRODUCT UPDATED!");
      res.redirect("/admin/products");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
