import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import ErrorHandler from '../utils/errorHandler.js';

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      return next(
        new ErrorHandler('Please kindly fill in the name of the category.', 500)
      );
    }
    const category = await Category.findOne({ name });
    if (category) {
      return next(new ErrorHandler('This name already exists.', 500));
    }
    const newCategory = new Category({
      name,
    });
    await newCategory.save();
    res.status(200).json({
      success: true,
      message: newCategory,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    if (!category) {
      return next(new ErrorHandler('There is no category available.', 404));
    }
    res.status(200).json({
      success: true,
      message: category,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return next(new ErrorHandler('there is no category under this id .'));
    }
    const products = await Product.deleteMany({ category: category.name });
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(201).json({
      success: true,
      message: 'Delete Successfuly',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: { name },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: updateCategory,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
