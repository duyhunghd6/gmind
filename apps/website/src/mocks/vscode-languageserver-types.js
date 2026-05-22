export const Position = {
  create(line, character) {
    return { line, character };
  },
  is(value) {
    return (
      typeof value === 'object' &&
      value !== null &&
      typeof value.line === 'number' &&
      typeof value.character === 'number'
    );
  },
};

export const Range = {
  create(start, end) {
    return { start, end };
  },
  is(value) {
    return (
      typeof value === 'object' &&
      value !== null &&
      Position.is(value.start) &&
      Position.is(value.end)
    );
  },
};

export const DiagnosticSeverity = {
  Error: 1,
  Warning: 2,
  Information: 3,
  Hint: 4,
};

export const DiagnosticTag = {
  Unnecessary: 1,
  Deprecated: 2,
};

export const CompletionItemKind = {
  Text: 1,
  Method: 2,
  Function: 3,
  Constructor: 4,
  Field: 5,
  Variable: 6,
  Class: 7,
  Interface: 8,
  Module: 9,
  Property: 10,
  Unit: 11,
  Value: 12,
  Enum: 13,
  Keyword: 14,
  Snippet: 15,
  Color: 16,
  File: 17,
  Reference: 18,
  Folder: 19,
  EnumMember: 20,
  Constant: 21,
  Struct: 22,
  Event: 23,
  Operator: 24,
  TypeParameter: 25,
};

export const CodeAction = {
  create(title, commandOrEdit, kind) {
    return { title, command: commandOrEdit, edit: commandOrEdit, kind };
  },
};

export const MarkupContent = {
  is(value) {
    return (
      typeof value === 'object' &&
      value !== null &&
      typeof value.kind === 'string' &&
      typeof value.value === 'string'
    );
  },
};

export const TextEdit = {
  replace(range, newText) {
    return { range, newText };
  },
  insert(position, newText) {
    return { range: { start: position, end: position }, newText };
  },
  del(range) {
    return { range, newText: '' };
  },
};
