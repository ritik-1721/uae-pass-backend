const router = require("express").Router();
var uaePassController = require("../controllers/uaePassController");

const v1 = '0.0.1';

router.get(`/${v1}/login`, uaePassController.login);
router.get(`/${v1}/callback`, uaePassController.callback);
router.get(`/${v1}/verify`, uaePassController.verify);
// router.post(`/${v1}/logout`, uaePassController.logout);

module.exports = router;