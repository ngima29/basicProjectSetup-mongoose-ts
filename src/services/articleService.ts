import slug from 'slug';
import { InputeArticleInterface, ArticleInterface,ArgsArticleInterface } from '../interfaces';
import { ArticleModel } from '../models'
import { MongooseQueryGenerator} from '../helpers'

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
    const dataExists = await ArticleModel.findOne({
      _id: id,
      deletedAt: null
    }).select('-deletedAt');
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
  async findAndCountAll({ offset, limit, query, sort, order, tags, title, author }: ArgsArticleInterface): Promise<{ count: number; rows: ArticleInterface[] }> {
    const skip = offset || 0;

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
    if (filter.length > 0) {
      const count = await ArticleModel.countDocuments({ $and: filter });
      const articles = await ArticleModel.find({ $and: filter })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: order === 'desc' ? -1 : 1 });
  
      return { count, rows: articles };
    } else {
      // If no filters provided, return all articles
      const count = await ArticleModel.countDocuments({});
      const articles = await ArticleModel.find({})
        .skip(skip)
        .limit(limit)
        .sort({ [sort]: order === 'asc' ? -1 : 1 });
  
      return { count, rows: articles };
    }

  
  }

}
