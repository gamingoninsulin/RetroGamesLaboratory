document.addEventListener('DOMContentLoaded', function() {
    fetch('./data/json/nds.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');

            // Check if alphabetical sorting is enabled
            if (data.Alphabetical_order) {
                data.games.sort((a, b) => a.name.localeCompare(b.name));
            }

            // Create a table element
            const table = document.createElement('table');
            table.classList.add('table', 'table-striped', 'table-centered');

            // Create the table head
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            const headerImage = document.createElement('th');
            headerImage.textContent = 'Cover Art';
            headerRow.appendChild(headerImage);

            const headerName = document.createElement('th');
            headerName.textContent = 'Game Name';
            headerRow.appendChild(headerName);

            const headerDownload = document.createElement('th');
            headerDownload.textContent = 'Download';
            headerRow.appendChild(headerDownload);

            const headerSize = document.createElement('th');
            headerSize.textContent = 'File Size';
            headerRow.appendChild(headerSize);

            const headerDate = document.createElement('th');
            headerDate.textContent = 'Date Added';
            headerRow.appendChild(headerDate);

            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create the table body
            const tbody = document.createElement('tbody');

            data.games.forEach(game => {
                const row = document.createElement('tr');

                const imageCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = game.image;
                img.alt = `${game.name} cover art`;
                img.style.width = '100px'; // Adjust the size as needed
                imageCell.appendChild(img);
                row.appendChild(imageCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = game.name;
                row.appendChild(nameCell);

                const linkCell = document.createElement('td');
                const downloadButton = document.createElement('button');
                downloadButton.textContent = "Download";
                downloadButton.addEventListener('click', () => {
                    game.file.forEach(linkUrl => {
                        const link = document.createElement('a');
                        link.href = linkUrl;
                        link.target = "_blank";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    });
                });
                linkCell.appendChild(downloadButton);
                row.appendChild(linkCell);

                const sizeCell = document.createElement('td');
                sizeCell.textContent = game.size + " MB";
                row.appendChild(sizeCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = game.date;
                row.appendChild(dateCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            contentDiv.appendChild(table);
        })
        .catch(error => console.error('Error fetching data:', error));
});
