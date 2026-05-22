export class ResponseError extends Error {
  constructor(code, message, data) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export const LSPErrorCodes = {
  ServerCancelled: -32802,
  RequestFailed: -32803,
};

export class Emitter {
  constructor() {
    this._listeners = [];
  }
  get event() {
    return (listener) => {
      this._listeners.push(listener);
      return {
        dispose: () => {
          const idx = this._listeners.indexOf(listener);
          if (idx >= 0) this._listeners.splice(idx, 1);
        }
      };
    };
  }
  fire(event) {
    for (const listener of this._listeners) {
      listener(event);
    }
  }
}

export const TextDocumentSyncKind = {
  None: 0,
  Full: 1,
  Incremental: 2,
};

export const DidChangeConfigurationNotification = {
  type: {
    method: 'workspace/didChangeConfiguration',
  },
};
