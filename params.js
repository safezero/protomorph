const Amorph = require('amorph')
const amorphBuffer = require('amorph-buffer')
const amorphBignumber = require('amorph-bignumber')

Amorph.loadPlugin(amorphBuffer)
Amorph.loadPlugin(amorphBignumber)
Amorph.ready()

module.exports = {
  version: new Amorph('00', 'hex'),
  name: new Amorph('My Store', 'ascii'),
  isOpen: new Amorph(1, 'number'),
  base: new Amorph('us', 'ascii'),
  info: new Amorph('Info about my store', 'ascii'),
  minProductsTotal: new Amorph(10000000, 'number'),
  affiliateFeeMicroperun: new Amorph(3000, 'number'),
  products: [{
    name: new Amorph('Chocolate chip cookies', 'ascii'),
    price: new Amorph(100000, 'number'),
    info: new Amorph('Ooey and gooey!', 'ascii'),
    imageMultihashes: [
      new Amorph('aaaaaa', 'hex'),
      new Amorph('bbbbbb', 'hex'),
      new Amorph('cccccc', 'hex')
    ]
  },{
    name: new Amorph('Sugar cookies', 'ascii'),
    price: new Amorph(200000, 'number'),
    info: new Amorph('Sweet and fresh!', 'ascii'),
    imageMultihashes: []
  }],
  transports: [{
    name: new Amorph('Domestic', 'ascii'),
    to: new Amorph('us', 'ascii'),
    price: new Amorph(10000000, 'number'),
    info: new Amorph('Home sweet home!', 'ascii')
  },{
    name: new Amorph('Global', 'ascii'),
    to: new Amorph('global', 'ascii'),
    price: new Amorph(20000000, 'number'),
    info: new Amorph('To every corner of the globe!', 'ascii')
  }],
}
