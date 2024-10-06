var code = "TESTCODE";


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
                    code = result.codeResult.code
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

document.getElementById('selector_name').addEventListener('input', function (event) {
    document.getElementById('name').textContent = event.target.value;
})

document.getElementById('selector_course').addEventListener('input', function (event) {
    document.getElementById('course').textContent = event.target.value;
})

function download() {
    var faces = document.querySelectorAll(".card_face");
    faces.forEach(function(face) {
        face.style.width = "2000px";
    });

    JsBarcode(document.getElementById("code"), code, {
        'width': 12,
        'height': 290,
        'displayValue': false
    });

    document.getElementById('name').style.fontSize = "88px";
    document.getElementById('course').style.fontSize = "46px";


    html2canvas(document.getElementById("card")).then(function (canvas) {
        var link = document.createElement('a');

        //var link = document.createElement('img');
        link.href = canvas.toDataURL();
        //link.src = canvas.toDataURL();
        link.download = 'carteirinha.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    faces.forEach(function (face) {
        face.style.width = "675px";
    });

    document.getElementById('name').style.fontSize = "24px";
    document.getElementById('course').style.fontSize = "20px";

    JsBarcode(document.getElementById("code"), code, {'width': 4, 'height' : 85,'displayValue': false});
}

JsBarcode(document.getElementById("code"), "TestCode", {'width': 4, 'height' : 85,'displayValue': false});