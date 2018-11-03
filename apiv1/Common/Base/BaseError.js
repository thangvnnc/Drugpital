"use strict";
const ResError = require("../Error/ResError");
class Error extends ResError{}

// Base
Error.CODE_OK                    = 0;
Error.CODE_ERR_PARAMS            = 1;
Error.CODE_ERR_EXECUTE_DB        = 2;
// Error.CODE_ERR_EXEC_DB_NOT_EXIST = 3;
Error.CODE_ERR_UNKNOWN           = 9999;
Error.OK 	                = (res)     => { return ResError.from(Error.CODE_OK, res, "Thành công")};
Error.ERR_PARAMS            = (msg)     => { return ResError.from(Error.CODE_ERR_PARAMS, null, "Lỗi parameter không hợp lệ", msg)};
Error.ERR_EXECUTE_DB        = (msg)     => { return ResError.from(Error.CODE_ERR_EXECUTE_DB, null, "Lỗi truy vấn csdl", msg)};
// Error.ERR_EXEC_DB_NOT_EXIST = (msg)     => { return ResError.from(Error.CODE_ERR_EXEC_DB_NOT_EXIST, null, "Lỗi [{0}] không có dữ liệu", msg)};
Error.ERR_UNKNOWN           = (msg)     => { return ResError.from(Error.CODE_ERR_UNKNOWN, null, "Lỗi #FFFFFFFF", msg)};

module.exports = Error;
