/**
 * Created by Soyal on 2016/11/23.
 */

/**
 * 观察者，用于监听数据是否发生更改
 * @param data
 */
function observe(data) {

    if(!data || typeof data !== "object") return;

    Object.keys(data).forEach(function(key) {

         defineReactive(data,key,data[key]);

    });
}

function defineReactive(data, key, value) {

    observe(value);

    var dep = new Dep();

    Object.defineProperty(data, key , {

        enumerable : true,

        configurable : false,

        get : function() {

            Dep.target && dep.addSub(Dep.target);

            return value;

        },

        set : function(newVal) {

            value = newVal;

            dep.notify();

        }
    })

}

/**
 * 订阅者
 * @constructor
 */
function Dep() {

    this.subs = [];

}

Dep.prototype.addSub = function(sub) {

    this.subs.push(sub);

};

Dep.prototype.notify = function() {

    this.subs.forEach(function(sub) {

        sub.update();

    });

};