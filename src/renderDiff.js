const renderDiff = (ast, currentDepth = 0) => {
  const indentSize = currentDepth * 4;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize + 4);

  const lines = ast.flatMap((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node;

    const stringify = (val, valDepth) => {
      if (typeof val !== 'object' || val === null) {
        return `${val}`;
      }
      const entries = Object.entries(val)
        .map(([k, v]) => `${' '.repeat(valDepth * 4 + 4)}  ${k}: ${stringify(v, valDepth + 1)}`);
      return `{\n${entries.join('\n')}\n${' '.repeat(valDepth * 4)}}`;
    };

    switch (type) {
      case 'removed':
        return `${currentIndent}- ${key}: ${stringify(value, currentDepth + 1)}`;
      case 'added':
        return `${currentIndent}+ ${key}: ${stringify(value, currentDepth + 1)}`;
      case 'unchanged':
        return `${currentIndent}  ${key}: ${stringify(value, currentDepth + 1)}`;
      case 'changed':
        return [
          `${currentIndent}- ${key}: ${stringify(oldValue, currentDepth + 1)}`,
          `${currentIndent}+ ${key}: ${stringify(newValue, currentDepth + 1)}`,
        ];
      case 'nested':
        return `${currentIndent}  ${key}: {\n${renderDiff(children, currentDepth + 1)}\n${bracketIndent}}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

export default renderDiff;
