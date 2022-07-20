const PORT_DEV = 8000;
const PORT = process.env.PORT || PORT_DEV;

const LIB_DIR = "build";
const LIB_MAP = "map";
const LIB_NAME = "domjs-min";
const LIB_VERSION = `v${dateFormat()}`;
const LIB_FILE_NAME = `${LIB_NAME}-${LIB_VERSION}`;

const SRC_DIR = "src";
const SRC_PATH = `${SRC_DIR}/configs/domInitializer.js`;
const SRC_TOOLS = `${SRC_DIR}/domjs`;

module.exports = {
    PORT,
    PORT_DEV,
    
    LIB_DIR,
    LIB_MAP,
    LIB_NAME,
    LIB_VERSION,
    LIB_FILE_NAME,

    SRC_DIR,
    SRC_PATH,
    SRC_TOOLS
}

function dateFormat () {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth()+1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return [month,day,year,hour,minutes].join('-');
}