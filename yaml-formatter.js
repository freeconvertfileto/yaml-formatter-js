(function() {
    var inputEl = document.getElementById('ymfInput');
    var outputEl = document.getElementById('ymfOutput');
    var statusEl = document.getElementById('ymfStatus');
    var indentEl = document.getElementById('ymfIndent');
    var formatBtn = document.getElementById('ymfFormat');
    var validateBtn = document.getElementById('ymfValidate');
    var copyBtn = document.getElementById('ymfCopy');
    var clearBtn = document.getElementById('ymfClear');

    function setStatus(msg, isError) {
        if (!statusEl) return;
        statusEl.textContent = msg;
        statusEl.className = 'ymf-status ' + (isError ? 'ymf-error' : 'ymf-ok');
    }

    function getIndent() {
        return indentEl ? parseInt(indentEl.value, 10) : 2;
    }

    function doFormat() {
        if (!inputEl || !outputEl) return;
        var input = inputEl.value;
        if (!input.trim()) { outputEl.value = ''; setStatus('', false); return; }
        if (typeof jsyaml === 'undefined') { setStatus('Library not loaded. Please refresh.', true); return; }
        try {
            var parsed = jsyaml.load(input);
            var formatted = jsyaml.dump(parsed, { indent: getIndent(), lineWidth: -1 });
            outputEl.value = formatted;
            setStatus('Valid YAML - formatted successfully.', false);
        } catch (e) {
            outputEl.value = '';
            setStatus('Error: ' + e.message, true);
        }
    }

    function doValidate() {
        if (!inputEl) return;
        var input = inputEl.value;
        if (!input.trim()) { setStatus('Enter YAML to validate.', true); return; }
        if (typeof jsyaml === 'undefined') { setStatus('Library not loaded. Please refresh.', true); return; }
        try {
            jsyaml.load(input);
            setStatus('Valid YAML - no errors found.', false);
        } catch (e) {
            setStatus('Invalid YAML: ' + e.message, true);
        }
    }

    if (formatBtn) formatBtn.addEventListener('click', doFormat);
    if (validateBtn) validateBtn.addEventListener('click', doValidate);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            if (!outputEl || !outputEl.value) return;
            navigator.clipboard.writeText(outputEl.value).then(function() {
                var orig = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(function() { copyBtn.textContent = orig; }, 1500);
            });
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (inputEl) inputEl.value = '';
            if (outputEl) outputEl.value = '';
            setStatus('', false);
        });
    }
})();
