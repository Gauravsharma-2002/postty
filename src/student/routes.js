const { Router } = require("express");
const controller = require("./controller");
const router = Router();
router.get("/", controller.getStudents);
router.post('/',controller.addStudent);
router.delete("/:id",controller.deleteStudent);
//update route for particular id
router.put("/:id",controller.updateStudent)


router.get("/:id",controller.getStudentById);

module.exports = router;
