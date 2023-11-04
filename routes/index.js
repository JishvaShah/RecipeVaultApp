import express from 'express';
let router = express.Router();


/* GET home page. */
router.get('/api', function(req, res) {
  res.json(["A",1,"B",2]);
});

export default router;
