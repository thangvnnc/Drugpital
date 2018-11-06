const express = require("express");
const router = express.Router();
const Error = require("./DiseaseError");
const MySqlCon = require("../MysqlConnection");
const Base = require("../Common/Base/Base");
const Log = require("../Common/Base/Log");

// Route by id
router.get("/get/byid", (req, res) => {
    // Kiểm tra đủ điểu kiện lấy dữ liệu
    let dataReq = req.query;
    let checkField = Base.isFieldsNotNull(dataReq, ["id"]);
    if (checkField.code !== Error.CODE_OK) {
        res.send(Error.ERR_PARAMS());
        return;
    }

    // Kiểm tra parameters hợp lệ
    let response = {};
    let id = parseInt(dataReq["id"]);

    // Lấy dữ liệu danh sách thuốc
    MySqlCon.query("SELECT * FROM `disease` WHERE `disease_id` = ?", [id], function (error, results) {
        if (error) {
            res.send(Error.ERR_EXECUTE_DB());
            Log.write(error);
            return;
        }
        response["items"] = results;
        res.send(Error.OK(response));
    });
});

// Route get all
router.get("/get", (req, res) => {
    // Kiểm tra đủ điểu kiện lấy dữ liệu
    let dataReq = req.query;
    let checkField = Base.isFieldsNotNull(dataReq, ["page", "record"]);
    if (checkField.code !== Error.CODE_OK) {
        res.send(Error.ERR_PARAMS());
        return;
    }

    // Kiểm tra parameters hợp lệ
    let response = {};
    let page = parseInt(req.query["page"]);
    let record = parseInt(req.query["record"]);
    if (page < 0 || record < 0) {
        res.send(Error.ERR_PARAMS());
        return;
    }

    // Lấy số lượng phần tử
    MySqlCon.query('SELECT COUNT(disease_id) as total FROM `disease`', function (error, results) {
        if (error) {
            res.send(Error.ERR_EXECUTE_DB());
            Log.write(error);
            return;
        }

        // Tạo thông tin query lấy dữ liệu thuốc
        let totalItem = parseInt(results[0]["total"]);
        let startRecord = parseInt((page - 1) * record);
        let totalPage = Math.ceil(totalItem / record);

        // Kiểm tra không có dữ liệu
        if (totalItem === 0) {
            response["page"] = page;
            response["record"] = record;
            response["totalItem"] = totalItem;
            response["totalPage"] = totalPage;
            response["items"] = results;
            res.send(Error.OK(response));
            return;
        }

        // Lấy dữ liệu danh sách thuốc
        MySqlCon.query("SELECT * FROM `disease` LIMIT ?, ?", [startRecord, record], function (error, results) {
            if (error) {
                res.send(Error.ERR_EXECUTE_DB());
                Log.write(error);
                return;
            }
            response["page"] = page;
            response["record"] = record;
            response["totalItem"] = totalItem;
            response["totalPage"] = totalPage;
            response["items"] = results;
            res.send(Error.OK(response));
        });
    });
});

// Route search
router.get("/find", (req, res) => {
    // Kiểm tra đủ điểu kiện lấy dữ liệu
    let dataReq = req.query;
    let checkField = Base.isFieldsNotNull(dataReq, ["query", "page", "record"]);
    if (checkField.code !== Error.CODE_OK) {
        res.send(Error.ERR_PARAMS());
        return;
    }

    // Kiểm tra parameters hợp lệ
    let response = {};
    let page = parseInt(req.query["page"]);
    let record = parseInt(req.query["record"]);
    let query = '%'.concat(req.query["query"].concat('%'));

    if (page < 0 || record < 0) {
        res.send(Error.ERR_PARAMS());
        return;
    }

    // Lấy số lượng phần tử
    MySqlCon.query("SELECT COUNT(`disease_id`) as total FROM `disease` WHERE `disease_name` LIKE ?", [query], function (error, results) {
        if (error) {
            res.send(Error.ERR_EXECUTE_DB());
            Log.write(error);
            return;
        }

        // Tạo thông tin query lấy dữ liệu thuốc
        let totalItem = parseInt(results[0]["total"]);
        let startRecord = parseInt((page - 1) * record);
        let totalPage = Math.ceil(totalItem / record);

        // Kiểm tra không có dữ liệu
        if (totalItem === 0) {
            response["page"] = page;
            response["record"] = record;
            response["totalItem"] = totalItem;
            response["totalPage"] = totalPage;
            response["items"] = results;
            res.send(Error.OK(response));
            return;
        }

        // Lấy dữ liệu danh sách thuốc
        MySqlCon.query("SELECT * FROM `disease` WHERE `disease_name` LIKE ? LIMIT ?, ?", [query, startRecord, record],
            function (error, results) {
                if (error) {
                    res.send(Error.ERR_EXECUTE_DB());
                    Log.write(error);
                    return;
                }
                response["page"] = page;
                response["record"] = record;
                response["totalItem"] = totalItem;
                response["totalPage"] = totalPage;
                response["items"] = results;
                res.send(Error.OK(response));
            });
    });
});

// Route search
router.get("/auto", (req, res) => {
    // Kiểm tra đủ điểu kiện lấy dữ liệu
    let dataReq = req.query;
    let checkField = Base.isFieldsNotNull(dataReq, ["query"]);
    if (checkField.code !== Error.CODE_OK) {
        res.send(Error.ERR_PARAMS());
        return;
    }

    // Kiểm tra parameters hợp lệ
    let response = {};
    let query = '%'.concat(req.query["query"].concat('%'));

    MySqlCon.query("SELECT `disease_id`, `disease_name` FROM `disease` WHERE `disease_name` LIKE ? LIMIT 0, 5", [query],
        function (error, results) {
            if (error) {
                res.send(Error.ERR_EXECUTE_DB());
                Log.write(error);
                return;
            }
            response["items"] = results;
            res.send(Error.OK(response));
        });
});

module.exports = router;
