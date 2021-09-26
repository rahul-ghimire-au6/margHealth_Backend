const Router = require("express");
const router = Router();
const upload = require("../config/multerConfig");
const medicineController = require("./../controller/medicineController")
const {authFolder} = require("../config/authUploadFolder") 


router.get("/getAll",medicineController.GET.getAll)
router.get("/searchByNameOrBatchNumber",medicineController.GET.searchByNameOrBatchNumber)
router.post("/uploadCSV",authFolder,upload.fields([{name: "excel",maxCount: 1}]),medicineController.POST.uploadCSV)
// Assuming record Id as unique "_id" in data stored in mongodb  
router.put("/edit/:recordId",medicineController.PUT.edit)
router.delete("/delete/:recordId",medicineController.DELETE.delete)


module.exports = router