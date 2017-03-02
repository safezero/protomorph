const params = require('./params')
const _ = require('lodash')
const chai = require('chai')
const chaiAmorph = require('chai-amorph')
const Amorph = require('amorph')

const protomorph = require('./')
const protobufjs = require('protobufjs')
const protofile = require('./test.protofile')
const protoType = protobufjs.parse(protofile).root.lookup('Store')

chai.use(chaiAmorph)
chai.should()

describe('protomorph', () => {
  let encoded
  it('should encode', () => {
    encoded = protomorph.encode(protoType, params)
  })

  it('encoded should be instanceof amorph', () => {
    encoded.should.be.instanceof(Amorph)
  })

  it('should decode', () => {
    const decoded = protomorph.decode(protoType, encoded)
    //sanity checks
    test(decoded, params)
    decoded.products[0].imageMultihashes.should.have.length(3)
    decoded.products[1].imageMultihashes.should.have.length(0)
  })
})

function test(decoded, params) {
  if (decoded instanceof Array) {
    decoded.should.have.length(params.length)
    decoded.forEach((value, index) => {
      test(value, params[index])
    })
    return
  }
  if (decoded instanceof Amorph) {
    decoded.should.amorphEqual(params, params.form)
    return
  }
  const keys = Object.keys(params)
  keys.forEach((key) => {
    test(decoded[key], params[key])
  })
}
