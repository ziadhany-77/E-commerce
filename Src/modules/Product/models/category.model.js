import mongoose from "mongoose";
import slugify from "slugify";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
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
    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'image'
    },
    
},
    { timestamps: true }
)
    
categorySchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true })
	next()
})

categorySchema.pre(/update/i, function (next) {
    if(this._update.name)
	this._update.slug = slugify(this._update.name, { lower: true })
	next()
})

categorySchema.pre(/find/, function (next) {
    this.populate('image',['path'])
    next()
})

categorySchema.pre(/delete/i, async function (next) {
    const CategoryWillBeDeleted = await categoryModel.findOne(this._conditions)
    if (!CategoryWillBeDeleted) return next()
    await mongoose.model('image').findByIdAndDelete(CategoryWillBeDeleted.image)
    
    next()
})

categorySchema.pre(/update/i, async function (next) {
    if(!this._update.image) return next()
    const CategoryWillBeUpdated = await categoryModel.findOne(this._conditions)
    if (!CategoryWillBeUpdated) return next()
    await mongoose.model('image').findByIdAndDelete(CategoryWillBeUpdated.image)
    next()
})

const categoryModel = mongoose.model('Category', categorySchema)

export default categoryModel

