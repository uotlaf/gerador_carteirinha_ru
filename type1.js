const codeOptions = {'width': 4, 'height' : 85,'displayValue': false};
let code = "TESTCODE";

document.getElementById('selector_code').addEventListener('change', readCode);
document.getElementById('selector_bg_front').addEventListener('change', changeFrontImage)
document.getElementById('selector_bg_back').addEventListener('change', changeBackImage)
document.getElementById('selector_pfp').addEventListener('change', changeFrontPFP)
document.getElementById('selector_name').addEventListener('input', changeName)
document.getElementById('selector_course').addEventListener('input', changeCourse)

function download() {
    const faces = document.querySelectorAll(".card_face");
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


    downloadCard()

    faces.forEach(function (face) {
        face.style.width = "675px";
    });

    document.getElementById('name').style.fontSize = "24px";
    document.getElementById('course').style.fontSize = "20px";

    JsBarcode(document.getElementById("code"), code, codeOptions);
}

JsBarcode(document.getElementById("code"), code, codeOptions);