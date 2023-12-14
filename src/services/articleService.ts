import slug from 'slug';
import { InputeArticleInterface, ArticleInterface, ArgsArticleInterface, PaginationMetadata } from '../interfaces';
import { ArticleModel } from '../models'
import { MongooseQueryGenerator } from '../helpers'

export class ArticleService {
  async create(input: InputeArticleInterface): Promise<ArticleInterface> {
    const inputSlug = slug(input.title);
    const dataExists = await ArticleModel.findOne({ slug: inputSlug, deletedAt: null });
    if (dataExists) throw new Error(`Article: ${input.title} is already exists!`);
    input.slug = inputSlug
    const created = await ArticleModel.create(input);
    return created;
  }

  async update(id: string, updates: Partial<InputeArticleInterface>): Promise<ArticleInterface | null> {
    const dataExists = await ArticleModel.findOne({
      _id: id,
      deletedAt: { $ne: null },
    })
    if (dataExists) throw new Error(`Given id: ${id} is not found or already deleted`);
    if (updates.title) {
      const updateSlug = slug(updates.title);
      const dataExists = await ArticleModel.findOne({ slug: updateSlug, deletedAt: null });
      if (dataExists) throw new Error(`Article: ${updates.title} is already exists!`);
      updates.slug = updateSlug
    }

    const updatedData = await ArticleModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedData) throw new Error(`Failed to update id : ${id} `)
    return updatedData;
  }
  async getById(id: string): Promise<ArticleInterface | null> {
    const dataExists = await ArticleModel.findOne({ _id: id, deletedAt: null }).select('-deletedAt');
    if (!dataExists) throw new Error(`Given id : ${id} is not found`)
    return dataExists;
  }

  async delete(id: string): Promise<boolean> {
    const deletedData = await ArticleModel.findOne({ _id: id, deletedAt: { $ne: null }, })
    if (deletedData) throw new Error(`Given id: ${id} is not found or already deleted`);
    const deleted = await ArticleModel.findByIdAndUpdate(
      id,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
    return true;
  }

  async findOne(query: object): Promise<ArticleInterface | null> {
    const dataExists = await ArticleModel.findOne(query);
    if (!dataExists) throw new Error(`Data not found for the given query: ${JSON.stringify(query)}`)
    return dataExists;
  }

  async findAndCountAll({
    page,
    limit,
    query,
    sort,
    order,
    tags,
    title,
    author,
  }: ArgsArticleInterface): Promise<{ metadata: PaginationMetadata; data: { count: number; rows: ArticleInterface[] } }> {
    try {
      if (isNaN(page) || isNaN(limit)) {
        throw new Error('Invalid page or limit');
      }
      const skip = Math.max((page - 1), 0) * limit;
      const queryGenerator = MongooseQueryGenerator;
      const filter = [];

      if (query) {
        filter.push(...queryGenerator.searchRegex({ query, fields: ['title'] }));
      }

      if (tags) {
        filter.push({ tags });
      }

      if (title) {
        filter.push(...queryGenerator.searchRegex({ query: title, fields: ['title'] }));
      }

      if (author) {
        filter.push(...queryGenerator.searchRegex({ query: author, fields: ['author'] }));
      }

      const count = filter.length > 0
        ? await ArticleModel.countDocuments({ $and: filter, deletedAt: null }).select('-deletedAt')
        : await ArticleModel.countDocuments({ deletedAt: null }).select('-deletedAt');

      const articles = filter.length > 0
        ? await ArticleModel.find({ $and: filter, deletedAt: null }).select('-deletedAt')
          .skip(skip)
          .limit(limit)
          .sort({ [sort]: order === 'desc' ? -1 : 1 })
        : await ArticleModel.find({ deletedAt: null }).select('-deletedAt')
          .skip(skip)
          .limit(limit)
          .sort({ [sort]: order === 'asc' ? -1 : 1 });

      const metadata: PaginationMetadata = {
        previousPage: page > 0 ? page - 1 : null,
        currentPage: page,
        nextPage: skip + articles.length < count ? page + 1 : null,
        perPage: limit,
      };

      return { metadata, data: { count, rows: articles } };
    } catch (error: any) {
      throw error;
    }
  }

}
