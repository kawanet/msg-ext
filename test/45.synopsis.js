"use strict";

const assert = require("assert");
const MsgExt = require("../").MsgExt;
const MsgInterface = require("msg-interface");
const msgToBuffer = MsgInterface.msgToBuffer;

const TITLE = __filename.split("/").pop();

const atos = (array) => [].map.call(array, (v) => (v > 15 ? "" : "0") + v.toString(16)).join("-");

describe(TITLE, function() {

  it("MsgExtDate", function() {

    class MsgExtDate extends MsgExt {
      static from(date) {
        const payload = Buffer.alloc(8);
        payload.writeDoubleBE(+date, 0);
        return new MsgExtDate(payload);
      }

      toDate() {
        return new Date(this.buffer.readDoubleBE(0));
      }
    }

    MsgExtDate.prototype.type = 0x0D;

    const now = Date.UTC(2018, 0, 2, 3, 4, 5);
    const msg = MsgExtDate.from(now);

    assert.strictEqual(msg.type, 0x0D);
    assert.strictEqual(msg.buffer.length, 8);
    assert.strictEqual(msg.msgpackLength, 10);

    const buffer = msgToBuffer(msg); // => <Buffer d7 01 42 76 15 28 a3 60 80 00>
    assert.strictEqual(atos(buffer), "d7-0d-42-76-0b-4d-37-48-80-00");

    const dt = msg.toDate(); // => 2018-01-02T03:04:05.000Z
    assert.strictEqual(+dt, +now);
  });
});
