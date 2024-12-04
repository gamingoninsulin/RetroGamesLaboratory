document.addEventListener('DOMContentLoaded', function() {
    fetch('./data/json/data.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');

            // Create a table element
            const table = document.createElement('table');
            table.classList.add('table', 'table-striped');

            // Create the table head
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            const headerName = document.createElement('th');
            headerName.textContent = 'Game Name';
            headerRow.appendChild(headerName);

            const headerDownload = document.createElement('th');
            headerDownload.textContent = 'Torrent Link';
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

                const nameCell = document.createElement('td');
                nameCell.textContent = game.name;
                row.appendChild(nameCell);

                const linkCell = document.createElement('td');
                const link = document.createElement('a');
                link.href = game.file;
                link.download = "";
                link.textContent = "Download";
                linkCell.appendChild(link);
                row.appendChild(linkCell);

                const sizeCell = document.createElement('td');
                sizeCell.textContent = game.size + " KB";
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