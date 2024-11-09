import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Function to populate resume data in the template
function generateRes() {
    const nameField = (document.getElementById('nameField') as HTMLInputElement).value;
    const contactField = (document.getElementById('contactField') as HTMLInputElement).value;
    const emailField = (document.getElementById('emailField') as HTMLInputElement).value;
    const addressField = (document.getElementById('addressField') as HTMLTextAreaElement).value;
    const linkedInField = (document.getElementById('linkedInField') as HTMLInputElement).value;
    const webField = (document.getElementById('webField') as HTMLInputElement).value;
    const githubField = (document.getElementById('githubField') as HTMLInputElement).value;
    const objectiveField = (document.getElementById('objectiveField') as HTMLTextAreaElement).value;
    const skillsField = (document.getElementById('skillsField') as HTMLTextAreaElement).value;
    const educationField = (document.getElementById('educationField') as HTMLTextAreaElement).value;
    const experienceField = (document.getElementById('experienceField') as HTMLTextAreaElement).value;
    const certificationsField = (document.getElementById('certificationsField') as HTMLTextAreaElement).value;

    // Set the fields in the template
    document.getElementById("NameT")!.textContent = nameField;
    document.getElementById("phony")!.textContent = contactField;
    document.getElementById("mailme")!.textContent = emailField;
    document.getElementById("Addr1")!.textContent = addressField;
    document.getElementById("linkT")!.textContent = linkedInField;
    document.getElementById("webdev")!.textContent = webField;
    document.getElementById("repoT")!.textContent = githubField;
    document.getElementById("ObjT")!.textContent = objectiveField;
    document.getElementById("skillz")!.textContent = skillsField;
    document.getElementById("projT")!.textContent = certificationsField;
    document.getElementById("expe")!.textContent = experienceField;
    document.getElementById("edu")!.textContent = educationField;

    document.getElementById('cvgen')!.style.display = 'none';
    document.getElementById('cv-template')!.style.display = 'block';
}

// Function to generate a shareable link based on the username
function generateShareableLink() {
    const nameField = (document.getElementById('nameField') as HTMLInputElement).value;
    const usernameField = (document.getElementById('usernameField') as HTMLInputElement).value;

    const resumeData = {
        name: nameField,
        username: usernameField,
        // Add other relevant data here
    };

    // Send a POST request to your Vercel serverless function
    fetch('/api/generateLink', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resumeData)
    })
    .then(response => response.json())
    .then(data => {
        const shareableLink = data.url;
        console.log("Shareable Link:", shareableLink);
        alert("Shareable Link: " + shareableLink);
    })
    .catch(error => {
        console.error("Error generating shareable link:", error);
    });
}

// Function to download the resume as a PDF
function downloadPDF() {
    html2canvas(document.getElementById("cv-template")!).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save("resume.pdf");
    });
}

// Event listeners for buttons
document.getElementById("generateBtn")?.addEventListener("click", generateRes);
document.getElementById("downloadBtn")?.addEventListener("click", downloadPDF);
document.getElementById("linkBtn")?.addEventListener("click", generateShareableLink);
