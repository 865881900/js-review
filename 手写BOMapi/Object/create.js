// eslint-disable-next-line no-extend-native
Object.defineProperty(Object.prototype, 'create1', {
  /**
   *
   * @param prop 原型对象
   * @param propertiesObject 描述对象
   */
  value(prop, propertiesObject) {
    if (typeof prop !== 'function' && typeof prop !== 'object') {
      throw new TypeError('prop参数必须为对象或者函数');
    }
    if (typeof propertiesObject !== 'object') {
      throw new TypeError('prop参数必须为对象或者函数');
    }

    function O() {
    }

    O.prototype = prop;
    const o = new O();
    // o.
    if (propertiesObject !== undefined) {
      try {
        Object.defineProperties(o, propertiesObject);
      } catch (e) {
        Object.keys(propertiesObject)
          .forEach((k) => {
            o[k] = propertiesObject[k];
          });
      }
    }
    if (prop === null) {
      // eslint-disable-next-line no-underscore-dangle
      o.__prop__ = null;
    }
    return o;
  },
});
