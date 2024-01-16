let generate = document.querySelector("#generate-pdf");

generate.addEventListener("click",()=>{
  generatePDF();
});

function generatePDF() {
    console.log("hello");
    const name = document.getElementById('name').value;
    const uid = document.getElementById('uid').value;
    const hashText = document.getElementById('hashText');
    const downloadLink = document.getElementById('downloadLink');
    const hashContainer = document.getElementById('hashContainer');
  
    // Generate PDF content
    const pdfContent = `
      <h3>Name: ${name}</h3>
      <h3>UID: ${uid}</h3>
    `;
  
    // Generate PDF
    html2pdf().from(pdfContent).outputPdf().then(function (pdf) {
      // Display SHA-256 hash
      const hash = CryptoJS.SHA256(pdf).toString(CryptoJS.enc.Hex);
      hashText.textContent = `SHA-256 Hash: ${hash}`;
      hashContainer.style.display = 'block';
  
      // Save hash to text file
      const blob = new Blob([hash], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hash.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      // Display download link
      downloadLink.style.display = 'block';
      downloadLink.href = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
    });
  }
  