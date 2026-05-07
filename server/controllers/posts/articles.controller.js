import articlesModel from '../../models/posts/articles.model.js'

import { handleErrorResponse } from '../../config/middlewares/errorHandler.js'

export async function createArticle (req, res) {
  try {
    const { content, date, title } = req.body

    const newArticle = await articlesModel.create({
      content,
      date,
      title
    })

    return res.status(201).json(newArticle)
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}

export async function deleteArticle (req, res) {
  try {
    const { id } = req.params

    const articleDeleted = await articlesModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { returnDocument: 'after' })

    if (!articleDeleted) {
      return res.status(404).json({ error: 'articleNotFound' })
    }

    return res.status(200).json({ deleted: id })
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}

export async function getArticleById (req, res) {
  try {
    const { id } = req.params

    // we use findOne instead of findById to apply
    // the pre middleware that filters out deleted articles
    const article = await articlesModel.findOne({ _id: id })

    if (!article) {
      return res.status(404).json({ error: 'articleNotFound' })
    }

    return res.status(200).json(article)
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}

export async function getArticles (req, res) {
  try {
    const articles = await articlesModel.find()
    return res.status(200).json(articles)
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}

export async function updateArticle (req, res) {
  try {
    const { id } = req.params
    const { content, date, title } = req.body

    const articleUpdated = await articlesModel.findByIdAndUpdate(id, { content, date, title }, { returnDocument: 'after' })

    if (!articleUpdated) {
      return res.status(404).json({ error: 'articleNotFound' })
    }

    return res.status(200).json(articleUpdated)
  } catch (error) {
    return handleErrorResponse(res, error)
  }
}
