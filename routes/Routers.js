var express = require("express");
var router = express.Router();
const Controller = require("../Controllers/RoomControllers");

const { MANAGER_Permission } = require("../middleware/authorization");

/**
 *@swagger
 *openapi: 3.0.1
 *servers:
 *  - url: http://localhost:3002
 *paths:
 *  /room/Create:
 *    post:
 *      description: Create Room
 *      tags: [Room]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                roomNumber:
 *                  type: int
 *                type:
 *                  type: string
 *                DoctorName:
 *                  type: string
 *                isPrioritized:
 *                  type: boolean
 *            examples:
 *              '0':
 *                value: "{\r\n\t\"roomNumber\": 3269,\r\n  \"type\": \"surgical disease\",\r\n \"DoctorName\": \"Nguyen Ngoc Long\",\r\n \"isPrioritized\": true\r\n}"
 *      responses:
 *        '200':
 *          description: New room
 *          content:
 *            application/json; charset=utf-8:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                   items:
 *                    properties:
 *              type: object
 *              properties:
 *                     roomNumber:
 *                       type: int
 *                     type:
 *                       type: string
 *                     DoctorName:
 *                       type: string
 *                     CurrentNumber:
 *                       type: int
 *                     TotalNumber:
 *                       type: int
 *                     isPrioritized:
 *                       type: boolean
 *                     _id:
 *                      type: string
 *              examples:
 *               '0':
 *                value: "{\r\n\t\"roomNumber\": 3269,\r\n  \"type\": \"surgical disease\",\r\n \"DoctorName\": \"Nguyen Ngoc Long\",\r\n \"CurrentNumber\": 0,\r\n \"TotalNumber\": 0,\r\n \"isPrioritized\": true,\r\n  \"_id\": \"639302a71f200e6100d94b7b\"\r\n}"
 *      servers:
 *        - url: http://localhost:3002
 *    servers:
 *      - url: http://localhost:3002
 */
router.post("/create", MANAGER_Permission, Controller.Create);

/**
 *@swagger
 *openapi: 3.0.1
 *servers:
 *  - url: http://localhost:3002
 *paths:
 *  /room/findAll/1/6:
 *    get:
 *      description: find room
 *      tags: [Room]
 *      responses:
 *        '200':
 *          description: room list
 *          content:
 *            application/json; charset=utf-8:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                   items:
 *                    properties:
 *              type: object
 *              properties:
 *                     docs:
 *                       type: array
 *                     totalDocs:
 *                       type: int
 *                     limit:
 *                       type: int
 *                     totalPages:
 *                       type: int
 *                     page:
 *                       type: int
 *                     pagingCounter:
 *                       type: int
 *                     hasPrevPage:
 *                       type: boolean
 *                     hasNextPage:
 *                       type: boolean
 *                     prevPage:
 *                       type: null
 *                     nextPage:
 *                       type: null
 *      servers:
 *        - url: http://localhost:3002
 *    servers:
 *      - url: http://localhost:3002
 */
router.get("/findAll/:page/:limit", Controller.findAll);

/**
 *@swagger
 *openapi: 3.0.1
 *servers:
 *  - url: http://localhost:3002
 *paths:
 *  /room/findAllWithFilter/1/6:
 *    post:
 *      description: add information to account
 *      tags: [Room]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                type:
 *                  type: string
 *                isPrioritized:
 *                  type: boolean
 *            examples:
 *              '0':
 *                value: "{\r\n\t\"type\": \"surgical disease\",\r\n \"isPrioritized\": true\r\n}"
 *      responses:
 *        '200':
 *          description: New account information
 *          content:
 *            application/json; charset=utf-8:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                   items:
 *                    properties:
 *              type: object
 *              properties:
 *                     docs:
 *                       type: array
 *                     totalDocs:
 *                       type: int
 *                     limit:
 *                       type: int
 *                     totalPages:
 *                       type: int
 *                     page:
 *                       type: int
 *                     pagingCounter:
 *                       type: int
 *                     hasPrevPage:
 *                       type: boolean
 *                     hasNextPage:
 *                       type: boolean
 *                     prevPage:
 *                       type: null
 *                     nextPage:
 *                       type: null
 *      servers:
 *        - url: http://localhost:3002
 *    servers:
 *      - url: http://localhost:3002
 */
router.post("/findAllWithFilter/:page/:limit", Controller.findAllFilter);

module.exports = router;
