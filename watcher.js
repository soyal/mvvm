/**
 * Created by Soyal on 2016/11/24.
 */

/**
 * 绑定在页面上的指令上
 * @param vm
 * @param key
 * @param cb
 * @constructor
 */
function Watcher(vm, key, cb) {

    this.vm = vm;

    this.key = key;

    this.cb = cb;

    this.value = this.get();

}

/**
 * 将自己添加入Dep队列
 */
Watcher.prototype.get = function() {

    Dep.target = this;

    var value = this.vm.getVMVal(this.key);

    Dep.target = null;

    return value;

};


Watcher.prototype.update = function() {

    var newVal = this.vm.getVMVal(this.key);

    if(this.value !== newVal) {

        this.cb.call(this, newVal, this.value);

        this.value = newVal;

    }

};