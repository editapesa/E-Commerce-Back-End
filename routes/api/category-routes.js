const router = require('express').Router();
// const { json } = require('sequelize/types');  
const { Category, Product } = require('../../models');

// find all categories, include its associated Products
router.get('/', (req, res) => {
  Category.findAll({ 
    include: [
      {
        model: Product,
      }, 
    ],
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

// find one category by its `id` value, include its associated Products
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
      },  
    ],
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
