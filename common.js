function readCode(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const blob = new Blob([e.target.result], {type: file.type});
            Quagga.decodeSingle({
                src: URL.createObjectURL(blob),
                decoder: {
                    readers: ["code_39_reader"]
                },
                locate: true,
            }, function (result) {
                if (result && result.codeResult) {
                    code = result.codeResult.code
                    JsBarcode(document.getElementById("code"), result.codeResult.code, codeOptions);
                } else {
                    alert("Código de barras não encontrado.");
                }
            });
        };
        reader.readAsArrayBuffer(file);
    }
}

function changeFrontImage(event) {
    document.getElementById('front').style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
}

function changeBackImage(event) {
    document.getElementById('back').style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
}

function changeFrontPFP(event) {
    document.getElementById('pfp_front').src = URL.createObjectURL(event.target.files[0]);
}

function changeBackPFP(event) {
    document.getElementById('pfp_front').src = URL.createObjectURL(event.target.files[0]);
}

function changeName(event) {
    document.getElementById('name').textContent = event.target.value;
}

function changeCourse(event) {
    document.getElementById('course').textContent = event.target.value;
}

function downloadCard() {
    html2canvas(document.getElementById("card")).then(function (canvas) {
        const link = document.createElement('a');

        //var link = document.createElement('img');
        link.href = canvas.toDataURL();
        //link.src = canvas.toDataURL();
        link.download = 'carteirinha.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}