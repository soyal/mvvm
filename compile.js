/**
 * Created by Soyal on 2016/11/23.
 */

//**************************** Compile ***************************

function Compile(el,vm) {

    this.vm = vm;

    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    this.$fragment = this.node2fragment();

    this.init();

    this.$el.appendChild(this.$fragment);

}


Compile.prototype.init = function () {

    this.compile(this.$fragment);

};

/**
 * 判断是否为element节点
 * @param el
 * @returns {boolean}
 */
Compile.prototype.isElementNode = function(el) {

    return el.nodeType === 1;

};

/**
 * 判断是否为文本节点
 * @param el
 * @returns {boolean}
 */
Compile.prototype.isTextNode = function(el) {

    return el.nodeType === 3;

};

/**
 * 将node节点中的所有子元素移植到documentFragment中
 * @returns {documentFragment}
 */
Compile.prototype.node2fragment = function() {

    if(!this.$el) return false;

    var fragment = document.createDocumentFragment(),
        child;

    while(child = this.$el.firstChild) {

        fragment.appendChild(child);

    }

    return fragment;
};

/**
 * 编译元素的入口方法
 * @param element
 */
Compile.prototype.compile = function(element) {

    var childNodes = element.childNodes,
        _this = this;

    Array.prototype.slice.call(childNodes).forEach(function(childNode) {

        var reg = /\{\{(.*)\}\}/,
            text = childNode.textContent;

        if(_this.isElementNode(childNode)) { //如果是元素节点

            _this.compileElementNode(childNode);

        } else if(_this.isTextNode(childNode) && reg.test(text)) { //如果是文本节点

            _this.compileText(childNode,RegExp.$1);

        }

        if(childNode.childNodes && childNode.childNodes.length) {

            _this.compile(childNode);

        }

    })

};

/**
 * 编译元素节点
 * @param node
 */
Compile.prototype.compileElement = function(node) {



};


/**
 * 编译文本节点
 * @param node
 * @param key
 */
Compile.prototype.compileText = function(node, key) {

    compileUtil.text(node, this.vm, key);

};

//************************ compileUtil **************************

var compileUtil = {

    bind : function(node, vm, key, dir) {   //将模板变量同updator绑定

        var updatorFn = updator[dir + "Updator"];

        updatorFn && updatorFn(node, vm.getVMVal(key));

        new Watcher(vm, key, function(newVal, oldVal) {

            updatorFn && updatorFn(node, newVal, oldVal);

        });

    },

    text : function(node, vm, key) {

        this.bind(node, vm, key, "text");

    }

};

//*********************** updator ********************************

var updator = {

    textUpdator : function(node, value) {

        node.textContent = typeof value === "undefined" ? "" : value;

    }

};