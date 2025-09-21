/*
    File: home-script.js
    Purpose: Handles homepage interactivity for resume upload,
    integrates backend API and Gemini redirection.
*/
import { API_BASE } from "./config.js"; // Make sure this points to your backend API

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selections ---
    const uploadInput = document.getElementById('resume-upload');
    const uploadBox = document.querySelector('.upload-box');
    const analyzeButton = document.getElementById('analyze-button');
    const fileStatus = document.getElementById('file-status');
    const uploadLabelText = document.getElementById('upload-label-text');

    // --- Function to handle the selected file ---
    const handleFile = (file) => {
        if (file) {
            // Validate file type
            if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                fileStatus.textContent = `✅ File selected: ${file.name}`;
                fileStatus.style.color = "green";
                analyzeButton.disabled = false; // Enable analyze button
                uploadLabelText.textContent = "File ready! Click below to analyze.";
            } else {
                fileStatus.textContent = `❌ Invalid file type. Please use PDF or DOCX.`;
                fileStatus.style.color = "red";
                analyzeButton.disabled = true;
            }
        }
    };

    // --- File Selection via Click ---
    uploadInput.addEventListener('change', () => {
        handleFile(uploadInput.files[0]);
    });

    // --- Drag and Drop ---
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.backgroundColor = '#e9eafc';
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.backgroundColor = 'transparent';
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.backgroundColor = 'transparent';
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    // --- Analyze Button Click ---
    analyzeButton.addEventListener('click', async () => {
        const file = uploadInput.files[0];
        if (!file) {
            fileStatus.textContent = "❌ Please select a file first.";
            return;
        }

        // Get user token from localStorage (after login)
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first to analyze your resume!");
            return;
        }

        // Show analyzing status
        fileStatus.textContent = "Analyzing your resume with AI... Please wait.";

        try {
            const formData = new FormData();
            formData.append('resume', file);

            const response = await fetch(`${API_BASE}/resume/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                // Show upload success
                fileStatus.innerHTML = `
                    ✅ Resume Uploaded! <br>
                    <a href="${data.fileUrl}" target="_blank">View Resume</a> <br>
                    Suggested Careers: ${data.analysis.suggestedCareers.join(", ")}
                `;

                // --- Gemini Redirection ---
                if (data.redirectUrl) {
                    fileStatus.textContent += "\nRedirecting to your personalized career roadmap...";
                    setTimeout(() => {
                        window.location.href = data.redirectUrl;
                    }, 2000); // 2-second delay before redirect
                }

            } else {
                fileStatus.textContent = `❌ Error: ${data.msg}`;
            }

        } catch (error) {
            console.error("Error uploading resume:", error);
            fileStatus.textContent = "❌ An error occurred while analyzing your resume.";
        }
    });

});
