const db = require("../models");
const router = require("express").Router();

router.put("/api/workouts/:id", (request, res) => {
  db.Workout.findOneAndUpdate(
    { _id: request.params.id },
    { $push: { exercises: request.body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/api/workouts', function({ body }, res) {
  db.Workout
      .create(body)
      .then((dbWorkout) => {
          res.json(dbWorkout);
      })
      .catch((err) => {
          console.log(err);
      });
});
router.get("/api/workouts/range", function(request, res) {
  db.Workout.find({}).limit(7)
  .then(dbWorkouts => {
      res.json(dbWorkouts);
  })
  .catch(err => {
      console.log(err);
  });
});    

router.get('/api/workouts', (request, res) =>{
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: '$exercises.duration'},
      }
    }
  ]) .then((dbWorkout) => {
    res.json(dbWorkout);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;