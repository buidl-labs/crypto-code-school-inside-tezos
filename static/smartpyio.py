## Copyright 2019-2020 Smart Chain Arena LLC. ##

from browser import window
import javascript


class Test:
    def __init__(self, name, shortname, f, profile, is_default):
        self.name = name
        self.shortname = shortname
        self.profile = profile
        self.f = f
        self.is_default = is_default

    def generateMichelson(self):
        import smartpy

        window.activeScenario = None
        window.contractNextId = 0
        window.lambdaNextId = 0
        window.contracts = {}
        window.validityErrors = []
        try:
            self.f()
        finally:
            results = []
            for cIndex in window.contracts:
                contract = window.smartmlCtx.call(
                    "importContract", window.contracts[cIndex].contract.export())
                compiledContract = window.smartmlCtx.call(
                    "compileContract", contract)
                michelson = window.smartmlCtx.call(
                    "compiledContract_to_michelson", compiledContract)
                storage = window.smartmlCtx.call(
                    'compileContractStorage', contract)
                results.append({'code': michelson, 'initialStorage': storage})
                # window.editor.appendOutput(michelson)

            return results


window.pythonTests = []


def add_test(name, shortname=None, profile=False, is_default=True):
    if shortname is None:
        shortname = name.replace(" ", "_")
    if any(x.shortname == shortname for x in window.pythonTests):
        raise Exception("Already defined test %s" % shortname)
    for x in shortname:
        if not (x in "_-" or x.isalnum()):
            raise Exception(
                "Bad test name: '%s', '%s' is forbidden\nTo solve the issue, you can add a shortname by doing, e.g.,\n\nsp.add_test(name = '%s', shortname='%s')"
                % (
                    shortname,
                    x,
                    name,
                    "".join(x for x in shortname if x in "_-" or x.isalnum()),
                )
            )

    def r(f):
        window.pythonTests.append(
            Test(name, shortname, f, profile, is_default))

    return r


context = globals().copy()
context["window"] = window
reverseLines = {}


def adaptBlocks(code):
    lines = code.split("\n") + [""]

    def indent(line):
        result = 0
        for i in line:
            if i == " ":
                result += 1
            else:
                break
        return result

    blocks = []
    lineId = 0
    newLines = []

    class NewLine:
        def __init__(self, pos, line):
            if pos is None:
                pos = -1
            self.pos = pos
            self.line = line

    for line in lines:
        initialLine = line
        lineId += 1
        newIndent = indent(line)
        stripped = line.strip()
        nline = line.strip(" \r")
        if line[newIndent:].startswith("sp.for "):
            p = nline[:-1].split(" ")
            if nline[-1] == ":" and p[0] == "sp.for" and p[2] == "in":
                line = "%swith sp.for_('%s', %s) as %s:" % (
                    newIndent * " ",
                    p[1],
                    " ".join(p[3:]),
                    p[1],
                )
        elif line[newIndent:].startswith("sp.if "):
            p = nline[:-1].split(" ")
            if nline[-1] == ":" and p[0] == "sp.if":
                line = "%swith sp.if_(%s):" % (
                    newIndent * " ", " ".join(p[1:]))
        elif line[newIndent:].startswith("sp.while "):
            p = nline[:-1].split(" ")
            if nline[-1] == ":" and p[0] == "sp.while":
                line = "%swith sp.while_(%s):" % (
                    newIndent * " ", " ".join(p[1:]))
        elif line[newIndent:].startswith("sp.else ") or line[newIndent:].startswith(
            "sp.else:"
        ):
            if nline[-1] == ":":
                line = "%swith sp.else_():" % (newIndent * " ")
        if initialLine.endswith("\r") and not line.endswith("\r"):
            line += "\r"
        newLines.append(NewLine(lineId, line))
    result = "\n".join(line.line for line in newLines)
    global reverseLines
    reverseLines.clear()
    for i in range(len(newLines)):
        reverseLines[str(i + 1)] = str(newLines[i].pos)
    return result


def toException(x):
    return Exception(x)


def formatErrorLine(line):
    i = -1
    while i + 2 < len(line) and line[i + 1] == " ":
        i += 1
    if 0 <= i:
        line = i * "&nbsp;" + line[i + 1:]
    return line


def showTraceback(title, trace):
    title = "Error: " + str(title)
    lines = []
    skip = False
    for line in trace.split("\n"):
        if not line:
            continue
        if skip:
            skip = False
            continue
        skip = (
            (
                "module smartpy line" in line
                and ("in runScenario" in line or "in pp" in line)
            )
            or (
                "module smartpyio line" in line
                and ("in run" in line or "in eval" in line or "in toException" in line)
            )
            or ("module __main__" in line and "in run" in line)
        )
        if not skip:
            lineStrip = line.strip()
            lineId = None
            line = formatErrorLine(line)
            if lineStrip.startswith("module <module>") or lineStrip.startswith(
                "File <string>"
            ):
                lineId = line.strip().split()[3].strip(",")
                line = line.replace(lineId, reverseLines.get(lineId, lineId))
            line = line.replace("module <module>", "SmartPy code").replace(
                "File <string>", "SmartPy code"
            )
            if "SmartPy code" in line:
                line = line
            if lineId:
                line = ( line + " " )
            lines.append(line)
    error = title + "\n\n" + lines[0] + "\n\n" + "\n".join(lines[1:-1])
    return javascript.JSON.stringify({'success': False, 'error': error})


testTemplate = """
@sp.add_test(name = "%s")
def test():
    # define a contract
    c1 = %s(..)
    scenario  = sp.testScenario()
    scenario += c1
    # scenario += c1.myEntryPoint(..)
    # scenario += c1.myEntryPoint(..)
    # scenario += c1.myEntryPoint(..)
    # scenario.verify(..)
    # scenario.show(..)
    # scenario.p(..)
    # scenario.h1(..)
"""


def run(code):
    window.pythonTests.clear()
    import smartpy

    smartpy.defaultVerifyMessage = None
    smartpy.sp.types.unknownIds = 0
    smartpy.sp.types.seqCounter = 0
    # code = window.editor.getValue()
    code = adaptBlocks(code)
    env = context.copy()
    exec(code, env)

    # Tests are required, smartpy uses it to infer the initial storage.
    results = []
    for test in window.pythonTests:
        results = test.generateMichelson()

    if True and len(window.pythonTests) == 0:
        html = ""
        for c in env:
            if "$" in c:
                continue
            if hasattr(env[c], "collectMessages"):
                html += (
                    "There is a sp.Contract class '%s' but no test is defined.\n\nPlease add a test such as:\n%s"
                    % (str(c), testTemplate % (c, c))
                )
                return javascript.JSON.stringify({'success': False, 'error': html})

    return javascript.JSON.stringify({'success': True, 'result': results})


window.generate = run
window.toException = toException
window.showTraceback = showTraceback
