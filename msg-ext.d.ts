// msg-ext
/// <reference types="node" />

import {MsgInterface} from "msg-interface";

export declare class MsgExt implements MsgInterface {
    constructor(payload: Buffer, type?: number);
    constructor(type: number, payload: Buffer);

    /**
     * payload
     */
    buffer: Buffer;

    /**
     * msgpack extension type number: -128 to +127
     */
    type: number;

    /**
     * expected maximum length of msgpack representation in bytes
     */
    msgpackLength: number;

    /**
     * write the msgpack representation to the buffer with an optional offset address
     * @return {number} actual length of msgpack representation written
     */
    writeMsgpackTo(buffer: Buffer, offset: number): number;
}
