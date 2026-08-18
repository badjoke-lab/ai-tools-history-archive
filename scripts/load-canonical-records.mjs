import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

export function loadCanonicalRecords() {
  const source = readFileSync('data/records.ts', 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true
    },
    fileName: 'data/records.ts',
    reportDiagnostics: true
  });

  const diagnostics = compiled.diagnostics ?? [];
  const errors = diagnostics.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  if (errors.length) {
    const formatHost = {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n'
    };
    throw new Error(ts.formatDiagnosticsWithColorAndContext(errors, formatHost));
  }

  const module = { exports: {} };
  const sandbox = {
    module,
    exports: module.exports,
    require: () => {
      throw new Error('Runtime imports are not allowed while loading canonical records');
    }
  };
  vm.runInNewContext(compiled.outputText, sandbox, { filename: 'data/records.compiled.cjs' });
  const records = module.exports.records;
  if (!Array.isArray(records)) throw new Error('Canonical records export was not found');
  return records;
}
