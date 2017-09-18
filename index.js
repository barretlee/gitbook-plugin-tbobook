// var cheerio = require('cheerio');

module.exports = {
    book: {
        assets: "./assets",
        js: [
            "index.js"
        ],
        css: [
            "index.css"
        ],
        html: {
            "html:start": function () {
                return "<!-- Start book " + this.options.title + " -->"
            },
            "html:end": function () {
                return "<!-- End of book " + this.options.title + " -->"
            },

            "head:start": "<!-- head:start -->",
            "head:end": "<!-- head:end -->",

            "body:start": "<!-- body:start -->",
            "body:end": "<!-- body:end -->"
        }
    },
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function () {
            console.log("init!");
        },

        // This is called after the book generation
        "finish": function () {
            console.log("finish!");
        },

        // The following hooks are called for each page of the book
        // and can be used to change page content (html, data or markdown)


        // Before parsing markdown
        "page:before": function (page) {
            // page.path is the path to the file
            // page.content is a string with the file markdown content

            // Example:
            //page.content = "# Title\n" + page.content;

            // var demo = 
            // page.content = page.content += demo;

            return page;
        },

        // Before html generation
        "page": function (page) {
            // var $ = cheerio.load(page.content);
            var path = page.path;
            var level = page.level.split('.')[0];
            var len = page.level.split('.').length;
            var modName, demo = '', partName;
            if (level == 4 && len == 3) {
                modName = page.title.split(' ')[0].toLowerCase();
                demo = '<h2 id="Demo 示例">Demo 示例</h2><iframe style="border:1px solid #CCC;width:375px;height:667px;" src=\'http://groups.alidemo.cn/WeexOpen/TBOC/examples/public/?type=demo&demo=' + modName + '\'></iframe>';
            }
            if (level == 5 && len >= 3) {
                modName = page.title.split(' ')[0].toLowerCase();
                partName = page.path.split('/')[1];demo = '<h2 id="Demo 示例">Demo 示例</h2><iframe style="border:1px solid #CCC;width:375px;height:667px;" src=\'http://groups.alidemo.cn/tida/tida/demo/public/?type=demo&part=' + partName + '&demo=' + modName + '\'></iframe>';
            }
            page.content += demo;
            return page;
        },

        // After html generation
        "page:after": function (page) {
            console.log(page)
            // page.path is the path to the file
            // page.content is a string with the html output

            // Example:
            //page.content = "<h1>Title</h1>\n" + page.content;
            // -> This title will be added before the html tag so not visible in the browser

            return page;
        }
    }
};