"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
var jspdf_1 = require("jspdf");
var html2canvas_1 = require("html2canvas");
function generateRes() {
    // Set resume template content once
    document.getElementById("NameT").textContent = document.getElementById('nameField').value;
    document.getElementById("phony").textContent = document.getElementById('contactField').value;
    // ... other fields ...
    // ... rest of your form field assignments ...
}
function downloadPDF() {
    var resumeElement = document.getElementById("resumeContent");
    if (resumeElement) {
        (0, html2canvas_1.default)(resumeElement).then(function (canvas) {
            var imgData = canvas.toDataURL("image/png");
            var pdf = new jspdf_1.jsPDF("p", "mm", "a4");
            var imgWidth = 190;
            var imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            pdf.save("resume.pdf");
        });
    }
    else {
        console.error("Resume content not found.");
    }
}
function generateShareableLink() {
    var resumeData = {
        name: document.getElementById('nameField').value,
        contact: document.getElementById('contactField').value,
        // ... other fields ...
    };
    if (!resumeData.name || !resumeData.contact) {
        alert("Please fill in all required fields.");
        return;
    }
    fetch('/api/generateLink', {
        method: 'POST',
        body: JSON.stringify(resumeData)
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var shareableLink = data.url;
        console.log("Shareable Link:", shareableLink);
        // Display or copy the link to the clipboard
    })
        .catch(function (error) {
        console.error("Error generating shareable link:", error);
        alert("An error occurred. Please try again later.");
    });
}
// Event listeners for buttons
(_a = document.getElementById("generateBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateRes);
(_b = document.getElementById("downloadBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", downloadPDF);
(_c = document.getElementById("linkBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", generateShareableLink);
var uuid_1 = require("uuid");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var resumeData, uniqueUrl;
        return __generator(this, function (_a) {
            if (req.method === 'POST') {
                try {
                    resumeData = req.body;
                    // Validate resume data here
                    if (!resumeData.name || !resumeData.contact) {
                        return [2 /*return*/, res.status(400).json({ error: 'Missing required fields' })];
                    }
                    uniqueUrl = "https://".concat(req.headers.host, "/resume/").concat((0, uuid_1.v4)());
                    res.status(200).json({ url: uniqueUrl });
                }
                catch (error) {
                    console.error('Error generating shareable link:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
            else {
                res.status(405).json({ message: 'Method Not Allowed' });
            }
            return [2 /*return*/];
        });
    });
}
