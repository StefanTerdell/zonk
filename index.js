"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
zod_1.z.ZodObject.prototype.zonk = function (input) {
    var _this = this;
    var value = this.parse(input);
    for (var k in this.shape) {
        if ("zonk" in this.shape[k]) {
            value[k] = this.shape[k].zonk(value[k]);
        }
    }
    return new Proxy(value, {
        get: function (obj, key) { return obj[key]; },
        set: function (obj, key, val) {
            obj[key] = val;
            _this.parse(obj);
            return true;
        },
    });
};
zod_1.z.ZodArray.prototype.zonk = function (input) {
    var _this = this;
    var value = this.parse(input);
    if ("zonk" in this._def.type) {
        for (var i in value) {
            value[i] = this._def.type.zonk(value[i]);
        }
    }
    return new Proxy(value, {
        get: function (x, i) { return x[i]; },
        set: function (x, i, val) {
            x[i] = val;
            _this.parse(x);
            return true;
        },
    });
};
