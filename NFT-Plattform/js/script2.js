const search = document.querySelector(".search-box input"),
      images = document.querySelectorAll(".image-box");

search.addEventListener("keyup", e =>{
    if(e.key == "Enter"){
        let searcValue = search.value,
            value = searcValue.toLowerCase();
            images.forEach(image =>{
                if(value === image.dataset.name){ //matching value with getting attribute of images
                    return image.style.display = "block";
                }
                image.style.display = "none";
         });
    }
});

search.addEventListener("keyup", () =>{
    if(search.value != "") return;

    images.forEach(image =>{
        image.style.display = "block";
    })
})



function generatePDF() {
  const searchInput = document.getElementById('searchInput');
  const images = document.querySelectorAll('.image-box');

  // Filter images based on search input value
  const filteredImages = Array.from(images).filter(image =>
    image.dataset.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  // Create a new jsPDF instance
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a5',
    putOnlyUsedFonts: true
  });

  // Loop through the filtered images and add them to the PDF
  let yPos = 10;
  filteredImages.forEach((image, index) => {
    const imageUrl = image.querySelector('img').getAttribute('src');
    const imageTitle = image.querySelector('h6').textContent;

    doc.addImage(imageUrl, 'png', 10, yPos, 50, 50);
    doc.text(imageTitle, 70, yPos + 25);

    yPos += 60; // Adjust the position for the next image

    // Add a new page after every 8 images
    if ((index + 1) % 8 === 0) {
      doc.addPage();
      yPos = 10; // Reset the y position for the new page
    }
  });

  // Save the PDF
  doc.save('filtered_nfts.pdf');
}
