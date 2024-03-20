import Product from '../models/product.model.js';
import ErrorHandler from '../utils/errorHandler.js';

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match
    );
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
export const getProducts = async (req, res, next) => {
  try {
    const features = new APIfeatures(Product.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const products = await features.query;
    res.status(200).json({
      success: true,
      message: {
        result: products.length,
        products: products,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { product_id, title, price, description, content, images, category } =
      req.body;
    if (!images) return next(new ErrorHandler('No image upload', 400));

    const product = await Product.findOne({ product_id });
    if (product)
      return next(new ErrorHandler('This product already exists.', 400));

    const newProduct = new Product({
      product_id,
      title: title.toLowerCase(),
      price,
      description,
      content,
      images,
      category,
    });

    await newProduct.save();
    res.status(200).json({
      success: true,
      message: 'Created a product',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { title, price, description, content, images, category } = req.body;
    console.log(title, price);

    if (!images) return next(new ErrorHandler('No image upload', 400));

    await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      {
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Updated a Product' });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json({ success: true, message: 'Deleted a Product' });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
