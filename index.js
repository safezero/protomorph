const Amorph = require('amorph')
const amorphBufferPlugin = require('amorph-buffer')
const arguguard = require('arguguard')
const ProtoType = require('protobufjs/src/Type')
const ProtoClass = require('protobufjs/src/Class')

Amorph.loadPlugin(amorphBufferPlugin)
Amorph.ready()

function crawl(object, target, func) {
  if (object instanceof target) {
    return func(object)
  }
  if (object instanceof Array) {
    return object.map((_object) => {
      return crawl(_object, target, func)
    })
  }
  const _object = {}
  const keys = object.$type ? Object.keys(object.$type.fields) : Object.keys(object)
  keys.forEach((key) => {
    _object[key] = crawl(object[key], target, func)
  })
  return _object
}


exports.encode = function encode(protoType, _pojo) {
  arguguard('encode', [ProtoType, Object], arguments)
  const pojo = crawl(_pojo, Amorph, (amorph) => {
    return amorph.to('uint8Array')
  })
  return new Amorph(protoType.encode(protoType.create(pojo)).finish(), 'buffer')
}

exports.decode = function decode(protoType, encoded) {
  arguguard('decode', [ProtoType, Amorph], arguments)
  const _pojo = protoType.decode(encoded.to('buffer'))
  const pojo = crawl(_pojo, Buffer, (buffer) => {
    return new Amorph(buffer, 'uint8Array')
  })
  return pojo
}
