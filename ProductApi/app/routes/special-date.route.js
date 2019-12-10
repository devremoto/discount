const controller = require('../controllers/special-date.controller');
module.exports = function(app) {
  /**
   * @swagger
   * definition:
   *   special-date:
   *     properties:
   *       description:
   *         type: string
   *       discount:
   *         type: number
   *       date:
   *         type: string
   */
  var routePath = '/special-dates';

  /**
   * @swagger
   * /special-dates:
   *   get:
   *     tags:
   *       - special-dates
   *     description: Returns all special-date
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of special-date
   *         schema:
   *           $ref: '#/definitions/special-date'
   *       500:
   *         description: Internal server error
   */
  app.get(routePath + '', controller.list);

  /**
   * @swagger
   * /special-dates/{id}:
   *   get:
   *     tags:
   *       - special-dates
   *     description: Returns all special-dates
   *     produces:
   *       - application/json
   *     parameters:
   *       - id: id
   *         description: id of json special-date
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Returns a list of special-date
   *         schema:
   *           $ref: '#/definitions/special-date'
   *       404:
   *         description: Id {id} not found
   *       500:
   *         description: Internal server error
   */
  app.get(routePath + '/:id', controller.getById);

  /**
   * @swagger
   * /special-dates:
   *   post:
   *     tags:
   *       - special-dates
   *     description: Creates a new special-date
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: special-date
   *         description: special-date object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/special-date'
   *     responses:
   *       201:
   *         description: special-date created
   *         schema:
   *           $ref: '#/definitions/special-date'
   *       500:
   *         description: Error while creating special-date
   */
  app.post(routePath + '/', controller.create);

  /**
   * @swagger
   * /special-dates:
   *   put:
   *     tags:
   *       - special-dates
   *     description: Upadates an object of special-date
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: special-date
   *         description: special-date object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/special-date'
   *     responses:
   *       200:
   *         description: special-date updated
   *         schema:
   *           $ref: '#/definitions/special-date'
   *       500:
   *         description: Error while updateing special-date
   */
  app.put(routePath + '/', controller.update);

  /**
   * @swagger
   * /special-dates/{id}:
   *   delete:
   *     tags:
   *       - special-dates
   *     description: Removes one object of special-date
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: special-date's id
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: special-date removed
   *       404:
   *         description: Id {id} not found
   *       500:
   *         description: Internal server error
   */
  app.delete(routePath + '/:id', controller.delete);
};
