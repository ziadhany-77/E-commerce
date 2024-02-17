import { ApiFeatures } from "../../../utils/apiFeatures.js"
import { catchAsyncError } from "../../../utils/errorhandeling.js"
import categoryModel from "../models/category.model.js"
import subCategoryModel from "../models/subcategory.model.js"

export const getSubcategories = catchAsyncError(async (req, res) => {
    const { categorySlug } = req.params
    const category = await categoryModel.findOne({ slug: categorySlug })
    if (!category) res.status(400).json({ message: 'category not found' })
    const apiFeatures = new ApiFeatures(
        subCategoryModel.find(),
        req.query
    ).paginate(5)
    const subcategories = await apiFeatures.query
    res.json(subcategories)
})

export const getSubcategory = catchAsyncError(async (req, res) => {
    const { categorySlug, subcategorySlug } = req.params
    const category = await categoryModel.findOne({ slug: categorySlug })
    if (!category) res.status(400).json({ message: 'category not found' })
    const subcategory = await subCategoryModel.findOne({
        slug: subcategorySlug,
        categoryId: category._id
    })
    res.json(subcategory)
})

export const addSubcategory = catchAsyncError(async (req, res) => {
    const { categorySlug } = req.params
    const category = await categoryModel.findOne({ slug: categorySlug })
    if (!category) res.status(400).json({ message: 'category not found' })
    const subcategory = await subCategoryModel.create({
        ...req.body,
        categoryId: category._id
    })
    res.status(201).json(subcategory)
})
export const updateSubcategory = catchAsyncError(async (req, res) => {
    const { categorySlug, subcategorySlug  } = req.params
    const category = await categoryModel.findOne({ slug: categorySlug })
    if (!category) res.status(400).json({ message: 'category not found' })
    const subcategory = await subCategoryModel.findOneAndUpdate({
        slug: subcategorySlug,
        categoryId: category._id
    },
        req.body,
        { new: true }
    )
    res.status(201).json(subcategory)
})
export const deleteSubcategory = catchAsyncError(async (req, res) => {
    const { categorySlug, subcategorySlug  } = req.params
    const category = await categoryModel.findOne({ slug: categorySlug })
    if (!category) res.status(400).json({ message: 'category not found' })
    const subcategory = await subCategoryModel.findOneAndDelete({
        slug: subcategorySlug,
        categoryId: category._id
    })
    res.status(201).json(subcategory)
})
