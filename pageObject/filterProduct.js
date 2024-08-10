const { expect } = require("@playwright/test");
exports.filterMethod = 
class filterMethod {
    constructor(page){
        this.page =page;
        this.selectFilter = '.product_sort_container';
    }
    async filterProductBy(filterProcess){
        await this.page.locator(this.selectFilter).selectOption(filterProcess)
    }

}