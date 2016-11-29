'use strict';

const {
  getArtRuntimeSpec,
  getArtClassLinkerSpec,
  getArtMethodSpec
} = require('../../lib/android');
const Java = require('../..');

rpc.exports = {
  getPointerSize() {
    return Process.pointerSize;
  },

  getAndroidVersion() {
    return performOnJavaVM(() => {
      return Java.androidVersion;
    });
  },

  getArtRuntimeSpec() {
    return performOnJavaVM(() => {
      return getArtRuntimeSpec(Java.vm, Java.classFactory);
    });
  },

  getArtClassLinkerSpec() {
    return performOnJavaVM(() => {
      return getArtClassLinkerSpec(Java.vm, Java.classFactory);
    });
  },

  getArtMethodSpec() {
    return performOnJavaVM(() => {
      return getArtMethodSpec(Java.vm, Java.classFactory);
    });
  },
};

function performOnJavaVM (task) {
  return new Promise((resolve, reject) => {
    Java.perform(() => {
      try {
        const result = task();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  });
}
