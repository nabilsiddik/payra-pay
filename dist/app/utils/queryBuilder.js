"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const constants_1 = require("../constants");
// query builder
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
        this.baseConditions = this.modelQuery._conditions || {};
    }
    // Implement filtering
    filter() {
        const filter = Object.assign({}, this.query);
        for (const field of constants_1.excludeFields) {
            delete filter[field];
        }
        this.modelQuery = this.modelQuery.find({
            $and: [this.baseConditions, filter]
        });
        return this;
    }
    // Implement searching
    search(searchableFields) {
        const searchTerm = this.query.searchTerm || "";
        if (!searchTerm)
            return this;
        const searchQuery = {
            $or: searchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' }
            }))
        };
        this.modelQuery = this.modelQuery.find({
            $and: [this.baseConditions, searchQuery]
        });
        return this;
    }
    // sorting
    sort() {
        const sort = this.query.sort || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    // fields
    fields() {
        var _a;
        const fields = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(',').join(' ')) || '';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    // Pagination
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    // Build model query
    build() {
        return this.modelQuery;
    }
    // Get Meta Data
    getMeta() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalDocuments = yield this.modelQuery.model.countDocuments();
            const page = Number(this.query.page) || 1;
            const limit = Number(this.query.limit) || 10;
            const totalPage = Math.ceil(totalDocuments / limit);
            return { page, limit, total: totalDocuments, totalPage };
        });
    }
}
exports.QueryBuilder = QueryBuilder;
