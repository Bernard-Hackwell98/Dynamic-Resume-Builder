import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function generateRes() {
  // Set resume template content once
document.getElementById("NameT")!.textContent = (document.getElementById('nameField') as HTMLInputElement).value;
document.getElementById("phony")!.textContent = (document.getElementById('contactField') as HTMLInputElement).value;
  // ... other fields ...

  // ... rest of your form field assignments ...
}

function downloadPDF() {
const resumeElement = document.getElementById("resumeContent");

if (resumeElement) {
    html2canvas(resumeElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("resume.pdf");
    });
} else {
    console.error("Resume content not found.");
}
}

function generateShareableLink() {
const resumeData = {
    name: (document.getElementById('nameField') as HTMLInputElement).value,
    contact: (document.getElementById('contactField') as HTMLInputElement).value,
    // ... other fields ...
};

if (!resumeData.name || !resumeData.contact){
    alert("Please fill in all required fields.");
    return;
}

fetch('/api/generateLink', {
    method: 'POST',
    body: JSON.stringify(resumeData)
})
.then(response => response.json())
.then(data => {
    const shareableLink = data.url;
    console.log("Shareable Link:", shareableLink);
    // Display or copy the link to the clipboard
})
.catch(error => {
    console.error("Error generating shareable link:", error);
    alert("An error occurred. Please try again later.");
});
}

// Event listeners for buttons
document.getElementById("generateBtn")?.addEventListener("click", generateRes);
document.getElementById("downloadBtn")?.addEventListener("click", downloadPDF);
document.getElementById("linkBtn")?.addEventListener("click", generateShareableLink);

// pages/api/generateLink.js
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

interface ResumeData {name: string;
contact: string;
  // ... other fields
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
    try {
const resumeData: ResumeData = req.body;

      // Validate resume data here
if (!resumeData.name || !resumeData.contact) {
        return res.status(400).json({ error: 'Missing required fields' });
}

      // Store resume data (e.g., in a database or file system)
      // ...

const uniqueUrl = `https://${req.headers.host}/resume/${uuidv4()}`;

res.status(200).json({ url: uniqueUrl });
    } catch (error) {
console.error('Error generating shareable link:', error);
res.status(500).json({ error: 'Internal Server Error' });
    }
} else {
    res.status(405).json({ message: 'Method Not Allowed' });
}
}