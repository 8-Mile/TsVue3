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
    },
    /*******************************数组操作类*********************************/

    /**
    * 根据指定数据 递归出该条具体信息
    * @param {String} id 需要查询的字段
    * @param {Array} items  递归的数据
    * @return {Object} obj 深度克隆需要的数据
    */
    getCurrentPart(id, items, obj) {
        if (obj) {
            return obj;
        }
        for (var i in items) {
            let item = items[i];
            if (item.code == id) {
                obj = item;
                break;
            } else if (item.children) {
                obj = this.getCurrentPart(id, item.children, obj);
            }
        }
        return obj;
    },
    /**
     * 数组合并去重，返回升序排列的数组
     * @param {Array} firstArray 第一个数组
     * @param {Array} secondArray 第二个数组
     * @return {Array} resultArray 处理后的数组
     */
    arrayMergeDeDuplication(firstArray, secondArray) {
        var aFirst = firstArray;
        var aSecond = secondArray;
        var resultArray = [];
        var tmp = aFirst.concat(aSecond);
        var o = {};
        for (var i = 0; i < tmp.length; i++) {
            if (tmp[i] in o) {
                o[tmp[i]]++;
            } else {
                o[tmp[i]] = 1;
            }
        }
        for (let x in o) {
            if (o[x] == 1) {
                resultArray.push(x);
            }
        }
        return resultArray;
    },
    /**
     * 合并多个简单数组并去除重复项
     * @return {Array} 合并后的数组
     */
    concatSimpleArray: function () {
        let newArr = Array.prototype.concat.apply([], arguments) //没有去重复的新数组
        return Array.from(new Set(newArr))
    },
    /**
     * 合并多个数组并去除重复项（对象组成的数组）[{},{}]
     * @param {Array} arr1 数组1
     * @param {Array} arr2 数组2
     * @param {String} primaryKey 数组对象主键字段名
     * @return {Array} 合并后的数组
     */
    concatArray: function (arr1, arr2, primaryKey) {
        let arr3 = arr1.concat(arr2); //两个数组对象合并
        let newArr = []; //盛放去重后数据的新数组
        for (let item1 of arr3) { //循环json数组对象的内容
            let flag = true; //建立标记，判断数据是否重复，true为不重复
            for (let item2 of newArr) { //循环新数组的内容
                if (item1[primaryKey] == item2[primaryKey]) { //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                    flag = false;
                }
            }
            if (flag) { //判断是否重复
                newArr.push(item1); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
            }
        }
        return newArr;
    },
    /**
     * 递归数据，把最后的children设为undefined
     * @param {Array} data 数据
     */
    getTreeData(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].children.length < 1) {
                // children若为空数组，则将children设为undefined
                data[i].children = undefined;
            } else {
                // children若不为空数组，则继续 递归调用 本方法
                this.getTreeData(data[i].children);
            }
        }
        return data;
    },
    /****************************验证类*********************************/

    /**
     * 验证身份证号
     * @param {String} val 身份证号
     */
    checkIdCard(val) {
        var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var code = val.substring(17);
        if (p.test(val)) {
            var sum = 0;
            for (var i = 0; i < 17; i++) {
                sum += val[i] * factor[i];
            }
            if (parity[sum % 11] == code.toUpperCase()) {
                return true;
            }
        }
        return false;
    },
    /**
     * 计算验证的汉字字符长度
     * @param {Number} codeLength 字段字节长度
     */
    computedChineseLen(codeLength) {
        if (parseInt(codeLength) < api.constObj.chineseRatio) {
            console.log("传入的字段字节数无效,请检查!");
            return 0;
        } else {
            return parseInt(codeLength / api.constObj.chineseRatio);
        }

    },

}
export default commonFun