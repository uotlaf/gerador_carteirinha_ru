document.getElementById('selector_code').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const blob = new Blob([e.target.result], {type: file.type});
            Quagga.decodeSingle({
                src: URL.createObjectURL(blob),
                numOfWorkers: 0,  // Use 0 for synchronous processing
                decoder: {
                    readers: ["code_39_reader"] // Especifica o tipo de código de barras
                },
                locate: true, // Localiza o código de barras na imagem
            }, function (result) {
                if (result && result.codeResult) {
                    JsBarcode(document.getElementById("code"), result.codeResult.code, {
                        'width': 4,
                        'displayValue': false
                    });
                } else {
                    alert("Código de barras não encontrado.");
                }
            });
        };
        reader.readAsArrayBuffer(file);
    }
});
document.getElementById('selector_bg_front').addEventListener('change', function (event) {
    document.getElementById('front').style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
})
document.getElementById('selector_bg_back').addEventListener('change', function (event) {
    document.getElementById('back').style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
})
document.getElementById('selector_pfp').addEventListener('change', function (event) {
    document.getElementById('pfp_front').src = URL.createObjectURL(event.target.files[0]);
})

function download() {
    html2canvas(document.getElementById("card")).then(function (canvas) {
        var link = document.createElement('a');

        link.href = canvas.toDataURL();
        link.download = 'carteirinha.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

JsBarcode(document.getElementById("code"), "TestCode", {'width': 4, 'height' : 85,'displayValue': false});