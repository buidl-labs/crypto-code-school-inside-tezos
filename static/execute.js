let id = 0;
// window.nextId = () => ++id;

window.editor = {
  getValue: () => '',
  appendOutput: output => output,
};

window.smartpyContext = {
  nextId: () => ++id,
  setOutput: () => null,
  // Bls12: window.Bls12
};

window.runCode = code => {
  try {
    if (window.generate == undefined) {
      return 'Editor not fully initialized yet.\nPlease wait for a few seconds and start again.';
    }
    const results = generate(code);

    // console.log(JSON.parse(results));
    return JSON.parse(results);
  } catch (error) {
    const er = showTraceback(error, '' + error);
    // console.log(JSON.parse(er));
    return JSON.parse(er);
  }
};
