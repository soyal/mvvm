/**
 * Created by Soyal on 2016/11/25.
 */

function Mvvm(options) {

    this.$options = options;

    var data = this._data = this.$options.data,
        me = this;

    Object.keys(data).forEach(function(key) {

        me._proxy(key);

    });

    observe(this._data);

    this.$compile = new Compile(this.$options.el, this);
}

/**
 * 将_data的属性代理到mvvm对象上
 * @param key
 * @private
 */
Mvvm.prototype._proxy = function(key) {

    var _this = this;

    Object.defineProperty(_this, key, {

        configurable : false,

        enumerable : true,

        get : function() {

            return _this._data[key];

        },

        set : function(newVal) {

            _this._data[key] = newVal;

        }

    })

};

Mvvm.prototype.getVMVal = function(key) {

    key = key.split(".");

    var val = this._data;

    key.forEach(function(k) {

        val = val[k];

    });

    return val;

};