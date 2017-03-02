module.exports = `

syntax = "proto3";

message Store {
  required bytes version = 1;
  required bytes name = 2;
  required bytes isOpen = 3;
  required bytes base = 4;
  required bytes info = 5;
  required bytes currency = 6;
  required bytes minProductsTotal = 7;
  required bytes affiliateFeeMicroperun = 8;
  repeated StoreProduct products = 9;
  repeated StoreTransport transports = 10;
}

message StoreProduct {
  required bytes name = 1;
  required bytes price = 2;
  required bytes info = 3;
  repeated bytes imageMultihashes = 4;
}

message StoreTransport {
  required bytes name = 1;
  required bytes to = 2;
  required bytes price = 3;
  required bytes info = 4;
}

`
