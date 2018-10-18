// msg-ext

import {Msg, MsgInterface} from "msg-interface";

export declare class MsgExt extends Msg implements MsgInterface {
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
}
