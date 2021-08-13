import api from "../api/api.js" //引入接口 
let vm = this;
const commonFun = {
    /**
     * excel导出
     * @param {Array} columns 表头数据
     * @param {Array} list 表格数据
     * @return {String} title 导出表格名称
     */
    exportExcel(columns, list, title) {// 导出
        console.log(2)
        require.ensure([], () => {
            const { export_json_to_excel } = require('../excel/Export2Excel');
            let tHeader = []
            let filterVal = []
            if (!columns) {
                return;
            }
            columns.forEach(item => {
                tHeader.push(item.title)
                filterVal.push(item.key)
            })
            const data = list.map(v => filterVal.map(j => v[j]))
            export_json_to_excel(tHeader, data, title);
        })
    }
}
export default commonFun