import { Query } from "mongoose"
import { excludeFields } from "../constants"

// query builder
export class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public readonly query: Record<string, string>
    private baseConditions: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery
        this.query = query
        this.baseConditions = (this.modelQuery as any)._conditions || {}
    }

    // Implement filtering
    filter(): this {
        const filter = { ...this.query }
        for (const field of excludeFields) {
            delete filter[field]
        }

        this.modelQuery = this.modelQuery.find({
            $and: [this.baseConditions, filter]
        })
        return this
    }

    // Implement searching
    search(searchableFields: string[]): this {
        const searchTerm = this.query.searchTerm || ""
        if (!searchTerm) return this

        const searchQuery = {
            $or: searchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' }
            }))
        }

        this.modelQuery = this.modelQuery.find({
            $and: [this.baseConditions, searchQuery]
        })
        return this
    }

    // sorting
    sort(): this {
        const sort = this.query.sort || '-createdAt'
        this.modelQuery = this.modelQuery.sort(sort)
        return this
    }

    // fields
    fields(): this {
        const fields = this.query.fields?.split(',').join(' ') || ''
        this.modelQuery = this.modelQuery.select(fields)
        return this
    }


    // Pagination
    paginate(): this {
        const page = Number(this.query.page) || 1
        const limit = Number(this.query.limit) || 10
        const skip = (page - 1) * limit

        this.modelQuery = this.modelQuery.skip(skip).limit(limit)

        return this
    }

    // Build model query
    build() {
        return this.modelQuery
    }

    // Get Meta Data
    async getMeta() {
        const totalDocuments = await this.modelQuery.model.countDocuments(
            this.baseConditions
        )

        const page = Number(this.query.page) || 1
        const limit = Number(this.query.limit) || 10
        const totalPage = Math.ceil(totalDocuments / limit)

        return { page, limit, total: totalDocuments, totalPage }
    }
}