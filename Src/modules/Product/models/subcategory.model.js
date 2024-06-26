import mongoose from "mongoose";
import slugify from "slugify";


const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 15,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        minLength: 3,
        maxLength: 200,
        unique: true,
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
},
    { timestamps: true }
)

subCategorySchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true })
	next()
})

subCategorySchema.pre(/update/i, function (next) {
    if(this._update.name)
	this._update.slug = slugify(this._update.name, { lower: true })
	next()
})

const subCategoryModel = mongoose.model('Subcategory', subCategorySchema)

export default subCategoryModel

