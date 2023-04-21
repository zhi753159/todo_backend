import { Request, Response, NextFunction } from 'express'

/**
 * Will inject models to the Express.Request.models
 *
 * example:
 * /users/:user/photos/:photo
 *
 * modelInjector({
 *  user: User,
 *  photo: Photo
 * })
 *
 * Keys in targets are the URL parameter.
 * Values in targets are BaseModel.
 */
export default (targets: any = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.models) {
      req.models = {}
    }

    for (const target in targets) {
      if (
        targets.hasOwnProperty(target) &&
        !req.models.hasOwnProperty(target) &&
        req.params.hasOwnProperty(target)
      ) {
        const modelId = req.params[target]
        const Model = targets[target]
        const model = await Model.findOne(modelId)

        if (!model) {
          return res.status(404).json()
        }

        if (model.visibleRelations.length > 0) {
          for (const relation of model.visibleRelations) {
            await model[relation]
          }
        }

        req.models[target] = model
      }

    }

    next()
  }
}
