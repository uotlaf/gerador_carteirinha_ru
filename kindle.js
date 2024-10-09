const codeOptions = {'width': 3, 'height': 200, 'displayValue': false};
const finalPageOptions = {
    'face.width':  "2000px",
    'name.fontSize' : "160px",
    'course.fontSize' : "120px",
    'code.options' : {'width' : 9, 'height': 600, 'displayValue' : false},
    'page.format' : ["2000", "2651"]
}

const faces = document.querySelectorAll(".card_face");
const name = document.getElementById('name')
const course = document.getElementById('course');

let original_name_size = name.style.fontSize;
let original_course_size = course.style.fontSize;
let original_face_size = faces[0].style.width;

let code = "TESTCODE";

document.getElementById('selector_code').addEventListener('change', readCode);
document.getElementById('selector_bg_front').addEventListener('change', changeFrontImage)
document.getElementById('selector_pfp').addEventListener('change', changeFrontPFP)
document.getElementById('selector_name').addEventListener('input', changeName)
document.getElementById('selector_course').addEventListener('input', changeCourse)


function resize_to_image() {
    faces.forEach(function (face) {
        face.style.width = finalPageOptions["face.width"];
    });

    JsBarcode(document.getElementById("code"), code, finalPageOptions["code.options"]);

    document.getElementById('name').style.fontSize = finalPageOptions["name.fontSize"];
    document.getElementById('course').style.fontSize = finalPageOptions["course.fontSize"];
}

function restore_size() {
    faces.forEach(function (face) {
        face.style.width = original_face_size;
    });

    document.getElementById('name').style.fontSize = original_name_size;
    document.getElementById('course').style.fontSize = original_course_size;

    JsBarcode(document.getElementById("code"), code, codeOptions);
}

function downloadPNG() {
    resize_to_image()
    downloadCardPNG()
    restore_size()
}

function downloadPDF() {
    resize_to_image()
    downloadCardPDF()
    restore_size()
}

JsBarcode(document.getElementById("code"), code, codeOptions);