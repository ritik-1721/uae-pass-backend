const router = require("express").Router();
const uaePassRoute = require("./uaePassRoute");
const { sendResponse } = require('../helpers/local.helper');

router.get("/a", (req, res) => { 
   return sendResponse(res, 200, 200, "aPage Not Found"); 
});

// router.use("/uae-pass", (req, res) => { 
//    return sendResponse(res, 200, 200, "uae-pass Page Not Found"); 
// });

router.use("/uae-pass", uaePassRoute);

module.exports = router;