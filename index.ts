import {
  ArrayCardinality,
  UnknownKeysParam,
  ZodRawShape,
  ZodTypeAny,
  objectInputType,
  objectOutputType,
  z,
} from "zod";

declare module "zod" {
  export interface ZodObject<
    T extends ZodRawShape,
    UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
    Catchall extends ZodTypeAny = ZodTypeAny,
    Output = objectOutputType<T, Catchall, UnknownKeys>,
    Input = objectInputType<T, Catchall, UnknownKeys>
  > {
    zonk: (input: Input) => Output;
  }

  export interface ZodArray<
    T extends ZodTypeAny = ZodTypeAny,
    Cardinality extends ArrayCardinality = "many"
  > {
    zonk: (input: Array<any>) => Array<T["_output"]>;
  }
}

z.ZodObject.prototype.zonk = function (input) {
  const value = this.parse(input);

  for (const k in this.shape) {
    if ("zonk" in this.shape[k]) {
      value[k] = this.shape[k].zonk(value[k]);
    }
  }

  return new Proxy(value, {
    get: (obj, key) => obj[key],
    set: (obj, key, val) => {
      obj[key] = val;
      this.parse(obj);
      return true;
    },
  });
};

z.ZodArray.prototype.zonk = function (input) {
  const value = this.parse(input);

  if ("zonk" in this._def.type) {
    for (const i in value) {
      value[i] = this._def.type.zonk(value[i]);
    }
  }

  return new Proxy(value, {
    get: (x, i: any) => x[i],
    set: (x, i: any, val) => {
      x[i] = val;
      this.parse(x);
      return true;
    },
  });
};
