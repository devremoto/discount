const controller = require('../controllers/product.controller');
module.exports = function(app) {
  /**
   * @swagger
   * definition:
   *   product:
   *     properties:
   *       _id:
   *         type: string
   *       priceInCents:
   *         type: integer
   *       title:
   *         type: string
   *       description:
   *         type: string
   *       discount:
   *         $ref: '#/definitions/discount'
   *   discount:
   *     properties:
   *       pct:
   *         type: number
   *       valueInCents:
   *         type: integer
   */
  var routePath = '/products';

  /**
   * @swagger
   * /products:
   *   get:
   *     tags:
   *       - products
   *     description: Returns all product
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of product
   *         schema:
   *           $ref: '#/definitions/product'
   *       500:
   *         description: Internal server error
   */
  app.get(routePath + '', controller.list);

  /**
   * @swagger
   * /products/{id}:
   *   get:
   *     tags:
   *       - products
   *     description: Returns all products
   *     produces:
   *       - application/json
   *     parameters:
   *       - id: id
   *         description: id of json product
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Returns a list of product
   *         schema:
   *           $ref: '#/definitions/product'
   *       404:
   *         description: Id {id} not found
   *       500:
   *         description: Internal server error
   */
  app.get(routePath + '/:id', controller.getById);

  /**
   * @swagger
   * /products:
   *   post:
   *     tags:
   *       - products
   *     description: Creates a new product
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: product
   *         description: product object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/product'
   *     responses:
   *       201:
   *         description: product created
   *         schema:
   *           $ref: '#/definitions/product'
   *       500:
   *         description: Error while creating product
   */
  app.post(routePath + '/', controller.create);

  /**
   * @swagger
   * /products:
   *   put:
   *     tags:
   *       - products
   *     description: Upadates an object of product
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: product
   *         description: product object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/product'
   *     responses:
   *       200:
   *         description: product updated
   *         schema:
   *           $ref: '#/definitions/product'
   *       500:
   *         description: Error while updateing product
   */
  app.put(routePath + '/', controller.update);

  /**
   * @swagger
   * /products/{id}:
   *   delete:
   *     tags:
   *       - products
   *     description: Removes one object of product
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: product's id
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: product removed
   *       404:
   *         description: Id {id} not found
   *       500:
   *         description: Internal server error
   */
  app.delete(routePath + '/:id', controller.delete);
};
