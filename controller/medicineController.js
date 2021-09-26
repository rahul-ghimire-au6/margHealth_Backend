let xlsx = require("xlsx");
let fs = require("fs");
const medicineModel = require("./../model/medicineModel");
const { findOne, findOneAndDelete } = require("./../model/medicineModel");
// Start of main code from here
module.exports = {
  GET: {
    getAll: async (req, res) => {
      try {
        let fetchMedicineData = await medicineModel.find({},{__v:0,createdAt:0,updatedAt:0}).lean();
        if (fetchMedicineData.length === 0) {
          return res
            .status(200)
            .json({ status: "success", message: "no data in db" });
        }
        res.status(200).json({ status: "success", message: fetchMedicineData });
      } catch (err) {
        console.log(`error name => ${err.name}`);
        console.log(`error message => ${err.message}`);
        res.status(400).json({
          status: "failed",
          errName: err.name,
          errMessage: err.message,
        });
      }
    },
    searchByNameOrBatchNumber: async (req, res) => {
      try {
        let name = req.query.name        
        let batchNumber = req.query['batch-number']

        console.log(name)
        console.log(batchNumber)

        let fetchMedicineData = undefined;

        if(name==="" && batchNumber==="" || name===undefined && batchNumber===undefined ){
          console.log("inside")
          return res.status(400).json({ status: "failed", message: "please send something in the query/ query cannot remain empty" });
        }else if(batchNumber===undefined || batchNumber===""){  
          fetchMedicineData = await medicineModel.find({c_name:name}).lean();
        }else if(name===undefined || name===""){
          fetchMedicineData = await medicineModel.find({c_batch_no:batchNumber}).lean();         
        }
        else{
          fetchMedicineData = await medicineModel.find({c_name:name,c_batch_no:batchNumber}).lean();
        }        
        if (fetchMedicineData.length === 0) {
          return res
            .status(200)
            .json({ status: "success", message: "no data in db" });
        }
        return res.status(200).json({ status: "success", message:fetchMedicineData});
      } catch (err) {
        console.log(`error name => ${err.name}`);
        console.log(`error message => ${err.message}`);
        res.status(400).json({
          status: "failed",
          errName: err.name,
          errMessage: err.message,
        });
      }
    },
  },
  POST: {
    uploadCSV: async (req, res) => {
      try {
        let uploadFolderData = await fs.readdirSync("uploads/excel");
        let workbook = xlsx.readFile(`uploads/excel/${uploadFolderData[0]}`);
        let sheet_name_list = workbook.SheetNames;
        let xlData = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list[0]]
        );
        let savedData = await medicineModel.create(xlData);
        res
          .status(200)
          .json({
            status: "success",
            message: "Successfully uploaded csv file and updated db",
          });
      } catch (err) {
        console.log(`error name => ${err.name}`);
        console.log(`error message => ${err.message}`);
        res.status(400).json({
          status: "failed",
          errName: err.name,
          errMessage: err.message,
        });
      }
    },
  },
  PUT: {
    edit: async (req, res) => {
      try {
        let recordId = req.params.recordId
        if(recordId===undefined){
          return res.status(400).json({"status":"failed","message":"please send the valid id"})
        }       

        let medicineData = await medicineModel.findOne({_id:recordId},{__v:0,createdAt:0,updatedAt:0}).lean()

        medicineData["c_name"] = req.body["c_name"]===undefined?medicineData["c_name"]:req.body["c_name"]
        medicineData["c_batch_no"] = req.body["c_batch_no"]===undefined?medicineData["c_batch_no"]:req.body["c_batch_no"]
        medicineData["d_expiry_date"] = req.body["d_expiry_date"]===undefined?medicineData["d_expiry_date"]:req.body["d_expiry_date"]
        medicineData["n_balance_qty"] = req.body["n_balance_qty"]===undefined?medicineData["n_balance_qty"]:req.body["n_balance_qty"]
        medicineData["c_packaging"] = req.body["c_packaging"]===undefined?medicineData["c_packaging"]:req.body["c_packaging"]
        medicineData["c_unique_code"] = req.body["c_unique_code"]===undefined?medicineData["c_unique_code"]:req.body["c_unique_code"]
        medicineData["n_mrp"] = req.body["n_mrp"]===undefined?medicineData["n_mrp"]:req.body["n_mrp"]
        medicineData["c_manufacturer"] = req.body["c_manufacturer"]===undefined?medicineData["c_manufacturer"]:req.body["c_manufacturer"]
        medicineData["hsn_code"] = req.body["hsn_code"]===undefined?medicineData["hsn_code"]:req.body["hsn_code"]

        let updatedData = await medicineModel.findOne({_id:recordId}).updateOne(medicineData)

        if(updatedData.acknowledged===true && updatedData.modifiedCount===1){
          return res.status(200).json({"status":"success","message":"Medicine Record Updated Successfully"})
        }else{
          return res.status(500).json({"status":"failed","message":"Something Went Wrong / Please try again later"})
        }  
      } catch (err) {
        console.log(`error name => ${err.name}`);
        console.log(`error message => ${err.message}`);
        res.status(400).json({
          status: "failed",
          errName: err.name,
          errMessage: err.message,
        });
      }
    },
  },
  DELETE: {
    delete: async (req, res) => {
      try {
        let recordId = req.params.recordId
        if(recordId===undefined){
          return res.status(400).json({"status":"failed","message":"please send the valid id"})
        }
        let deleteData = await medicineModel.findOneAndDelete({_id:recordId})
        if(deleteData===null){
          return res.status(200).json({"status":"failed","message":"provided id is not present in db"})
        }
        return res.status(200).json({"status":"success","message":"Medicine Record Deleted Successfully"})
      } catch (err) {
        console.log(`error name => ${err.name}`);
        console.log(`error message => ${err.message}`);
        res.status(400).json({
          status: "failed",
          errName: err.name,
          errMessage: err.message,
        });
      }
    },
  },
};
