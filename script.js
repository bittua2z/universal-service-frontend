 function toggleDetails() {
    const details = document.getElementById('mobile-details');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

function toggleComputerDetails() {
    const details = document.getElementById('computer-details');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

function toggleWashingDetails() {
    const details = document.getElementById('washing-details');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

function toggleCarDetails() {
    const details = document.getElementById('car-details');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

function toggleElectronicsDetails() {
    const details = document.getElementById('electronics-details');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

function toggleElectricalDetails() {
    const details = document.getElementById('electrical-details');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

document.getElementById('quotation-btn').addEventListener('click', function() {
    const form = document.getElementById('quotation-form');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});

// About functionality
document.getElementById('about-btn').addEventListener('click', function() {
    const section = document.getElementById('about-section');
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
});

// User login functionality
document.getElementById('user-btn').addEventListener('click', function() {
    const form = document.getElementById('login-form');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});

document.getElementById('user-login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('authToken', btoa(username + ':' + password));
        alert('Login successful!');
        // Hide login form and other page elements
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';
        // Hide main page elements
        document.querySelector('.title').style.display = 'none';
        document.querySelector('.info').style.display = 'none';
        document.querySelector('.buttons').style.display = 'none';
        document.querySelector('.service-tag').style.display = 'none';
        document.querySelector('.services-list').style.display = 'none';
        // Hide any open sections
        document.getElementById('quotation-form').style.display = 'none';
        document.getElementById('accessories-section').style.display = 'none';
        loadStockAccessories();
    } else {
        alert('Invalid username or password.');
    }
});

document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('authToken');
    // Hide user section and login form
    document.getElementById('user-section').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    // Show back main page elements
    document.querySelector('.title').style.display = 'block';
    document.querySelector('.info').style.display = 'block';
    document.querySelector('.buttons').style.display = 'flex'; // Assuming flex for buttons
    document.querySelector('.service-tag').style.display = 'block';
    document.querySelector('.services-list').style.display = 'block';
});

document.getElementById('quote-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const select = document.querySelector('select[name="service"]');
    const services = Array.from(select.selectedOptions).map(option => option.value);
    const comment = document.querySelector('textarea[name="comment"]').value;
    if (!name || !phone || services.length === 0) {
        alert('Please fill all fields and select at least one service.');
        return;
    }
    let message = `Quotation Request\nName: ${name}\nPhone: ${phone}\nServices: ${services.join(', ')}`;
    if (comment.trim()) {
        message += `\nComment: ${comment}`;
    }
    const whatsappUrl = `https://wa.me/7600355061?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Accessories functionality
document.getElementById('accessories-btn').addEventListener('click', function() {
    const section = document.getElementById('accessories-section');
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        loadPublicAccessories();
    } else {
        section.style.display = 'none';
    }
});

// Stock Accessories Management - Table with Add Row Option

document.getElementById('add-row-btn').addEventListener('click', function() {
    const tbody = document.getElementById('stock-table-body');
    const row = document.createElement('tr');
    row.style.backgroundColor = '#555';
    row.style.color = 'white';

    // Image cell with file input
    const imgCell = document.createElement('td');
    imgCell.style.border = '1px solid #555';
    imgCell.style.padding = '10px';
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.width = '100%';
    fileInput.dataset.cell = 'image';
    fileInput.addEventListener('change', function() {
        if (this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                let preview = imgCell.querySelector('img.preview');
                if (!preview) {
                    preview = document.createElement('img');
                    preview.className = 'preview';
                    preview.style.width = '50px';
                    preview.style.height = '50px';
                    preview.style.marginTop = '5px';
                    imgCell.appendChild(preview);
                }
                preview.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
    imgCell.appendChild(fileInput);

    // Price cell with input
    const priceCell = document.createElement('td');
    priceCell.style.border = '1px solid #555';
    priceCell.style.padding = '10px';
    const priceInput = document.createElement('input');
    priceInput.type = 'text';
    priceInput.placeholder = 'Enter price';
    priceInput.style.width = '100%';
    priceInput.style.backgroundColor = '#333';
    priceInput.style.color = 'white';
    priceInput.style.border = '1px solid #555';
    priceInput.dataset.cell = 'price';
    priceCell.appendChild(priceInput);

    // Detail cell with textarea
    const detailCell = document.createElement('td');
    detailCell.style.border = '1px solid #555';
    detailCell.style.padding = '10px';
    const detailInput = document.createElement('textarea');
    detailInput.rows = '2';
    detailInput.placeholder = 'Enter product detail';
    detailInput.style.width = '100%';
    detailInput.style.backgroundColor = '#333';
    detailInput.style.color = 'white';
    detailInput.style.border = '1px solid #555';
    detailInput.dataset.cell = 'detail';
    detailCell.appendChild(detailInput);

    // Action cell with save and cancel buttons
    const actionCell = document.createElement('td');
    actionCell.style.border = '1px solid #555';
    actionCell.style.padding = '10px';
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.background = 'green';
    saveBtn.style.color = 'white';
    saveBtn.style.border = 'none';
    saveBtn.style.marginRight = '5px';
    saveBtn.style.cursor = 'pointer';
    saveBtn.addEventListener('click', function() {
        const row = this.closest('tr');
        const file = row.querySelector('input[type="file"]').files[0];
        const price = row.querySelector('input[placeholder="Enter price"]').value;
        const detail = row.querySelector('textarea[placeholder="Enter product detail"]').value;
        if (!file || !price || !detail) {
            alert('Please fill all fields and select an image.');
            return;
        }
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('price', price);
        formData.append('detail', detail);
        const authToken = localStorage.getItem('authToken');
        fetch('https://universal-service-backend-2.onrender.com/api/stocks', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + authToken
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                loadStockAccessories();
                row.remove();
            } else {
                alert('Error adding stock.');
            }
        })
        .catch(error => console.error('Error adding stock:', error));
    });
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.background = 'gray';
    cancelBtn.style.color = 'white';
    cancelBtn.style.border = 'none';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.addEventListener('click', function() {
        row.remove();
    });
    actionCell.appendChild(saveBtn);
    actionCell.appendChild(cancelBtn);

    row.appendChild(imgCell);
    row.appendChild(priceCell);
    row.appendChild(detailCell);
    row.appendChild(actionCell);
    tbody.appendChild(row);
});

async function loadStockAccessories() {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('https://universal-service-backend-2.onrender.com/api/stocks', {
            headers: {
                'Authorization': 'Basic ' + authToken
            }
        });
        const data = await response.json();
        const tbody = document.getElementById('stock-table-body');
        // Clear only display rows, keep input rows if any
        const displayRows = tbody.querySelectorAll('tr:not(:has(input[type="file"]))');
        displayRows.forEach(row => row.remove());
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.style.backgroundColor = index % 2 === 0 ? '#333' : '#444';
            row.style.color = 'white';

            const imgCell = document.createElement('td');
            imgCell.style.border = '1px solid #555';
            imgCell.style.padding = '10px';
            const img = document.createElement('img');
            img.src = item.image;
            img.style.width = '50px';
            img.style.height = '50px';
            imgCell.appendChild(img);

            const priceCell = document.createElement('td');
            priceCell.style.border = '1px solid #555';
            priceCell.style.padding = '10px';
            priceCell.textContent = item.price;

            const detailCell = document.createElement('td');
            detailCell.style.border = '1px solid #555';
            detailCell.style.padding = '10px';
            detailCell.textContent = item.detail;

            const actionCell = document.createElement('td');
            actionCell.style.border = '1px solid #555';
            actionCell.style.padding = '10px';
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.style.background = 'blue';
            editBtn.style.color = 'white';
            editBtn.style.border = 'none';
            editBtn.style.marginRight = '5px';
            editBtn.style.cursor = 'pointer';
            editBtn.addEventListener('click', function() {
                editRow(item, row);
            });
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.background = 'red';
            deleteBtn.style.color = 'white';
            deleteBtn.style.border = 'none';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this stock?')) {
                    const authToken = localStorage.getItem('authToken');
                    fetch('https://universal-service-backend-2.onrender.com/api/stocks/' + item.id, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Basic ' + authToken
                        }
                    })
                        .then(() => loadStockAccessories())
                        .catch(error => console.error('Error deleting stock:', error));
                }
            });
            actionCell.appendChild(editBtn);
            actionCell.appendChild(deleteBtn);

            row.appendChild(imgCell);
            row.appendChild(priceCell);
            row.appendChild(detailCell);
            row.appendChild(actionCell);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading stock:', error);
    }
}

function editRow(item, currentRow) {
    const tbody = document.getElementById('stock-table-body');

    const row = document.createElement('tr');
    row.style.backgroundColor = '#555';
    row.style.color = 'white';

    // Image cell with file input and current image
    const imgCell = document.createElement('td');
    imgCell.style.border = '1px solid #555';
    imgCell.style.padding = '10px';
    const currentImg = document.createElement('img');
    currentImg.src = item.image;
    currentImg.style.width = '50px';
    currentImg.style.height = '50px';
    currentImg.style.marginBottom = '5px';
    imgCell.appendChild(currentImg);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.width = '100%';
    fileInput.dataset.cell = 'image';
    fileInput.addEventListener('change', function() {
        if (this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                currentImg.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
    imgCell.appendChild(fileInput);

    // Price cell with input
    const priceCell = document.createElement('td');
    priceCell.style.border = '1px solid #555';
    priceCell.style.padding = '10px';
    const priceInput = document.createElement('input');
    priceInput.type = 'text';
    priceInput.value = item.price;
    priceInput.style.width = '100%';
    priceInput.style.backgroundColor = '#333';
    priceInput.style.color = 'white';
    priceInput.style.border = '1px solid #555';
    priceInput.dataset.cell = 'price';
    priceCell.appendChild(priceInput);

    // Detail cell with textarea
    const detailCell = document.createElement('td');
    detailCell.style.border = '1px solid #555';
    detailCell.style.padding = '10px';
    const detailInput = document.createElement('textarea');
    detailInput.rows = '2';
    detailInput.value = item.detail;
    detailInput.style.width = '100%';
    detailInput.style.backgroundColor = '#333';
    detailInput.style.color = 'white';
    detailInput.style.border = '1px solid #555';
    detailInput.dataset.cell = 'detail';
    detailCell.appendChild(detailInput);

    // Action cell with save and cancel buttons
    const actionCell = document.createElement('td');
    actionCell.style.border = '1px solid #555';
    actionCell.style.padding = '10px';
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.background = 'green';
    saveBtn.style.color = 'white';
    saveBtn.style.border = 'none';
    saveBtn.style.marginRight = '5px';
    saveBtn.style.cursor = 'pointer';
    saveBtn.addEventListener('click', function() {
        const price = priceInput.value;
        const detail = detailInput.value;
        const file = fileInput.files[0];
        if (!price || !detail) {
            alert('Please fill price and detail.');
            return;
        }
        const formData = new FormData();
        formData.append('price', price);
        formData.append('detail', detail);
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }
            formData.append('file', file);
        }
        const authToken = localStorage.getItem('authToken');
        fetch(`https://universal-service-backend-2.onrender.com/api/stocks/${item.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + authToken
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                loadStockAccessories();
            } else {
                alert('Error updating stock.');
            }
        })
        .catch(error => console.error('Error updating stock:', error));
    });
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.background = 'gray';
    cancelBtn.style.color = 'white';
    cancelBtn.style.border = 'none';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.addEventListener('click', function() {
        loadStockAccessories();
    });
    actionCell.appendChild(saveBtn);
    actionCell.appendChild(cancelBtn);

    row.appendChild(imgCell);
    row.appendChild(priceCell);
    row.appendChild(detailCell);
    row.appendChild(actionCell);
    tbody.replaceChild(row, currentRow);
}

async function loadPublicAccessories() {
    try {
        const response = await fetch('https://universal-service-backend-2.onrender.com/api/stocks');
        const data = await response.json();
        const container = document.getElementById('public-accessories-images');
        container.innerHTML = '';
        data.forEach(item => {
            const div = document.createElement('div');
            div.style.display = 'inline-block';
            div.style.position = 'relative';
            const img = document.createElement('img');
            img.src = item.image;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.margin = '5px';
            div.appendChild(img);
            const priceDiv = document.createElement('div');
            priceDiv.style.color = 'white';
            priceDiv.style.textAlign = 'center';
            priceDiv.textContent = `Price: ${item.price}`;
            div.appendChild(priceDiv);
            const buyBtn = document.createElement('button');
            buyBtn.textContent = 'Buy';
            buyBtn.style.backgroundColor = '#25D366';
            buyBtn.style.color = 'white';
            buyBtn.style.border = 'none';
            buyBtn.style.padding = '5px 10px';
            buyBtn.style.marginTop = '5px';
            buyBtn.style.cursor = 'pointer';
            buyBtn.style.borderRadius = '5px';
            buyBtn.style.display = 'block';
            buyBtn.style.margin = '0 auto';
            buyBtn.addEventListener('click', function() {
                const message = `Buy Request\nAccessory: ${item.detail || 'N/A'}\nPrice: ${item.price}\nProduct Image: ${item.image}\nPlease contact me.`;
                const whatsappUrl = `https://wa.me/7600355061?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
            div.appendChild(buyBtn);
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading public accessories:', error);
    }
}

// Load data on page load for persistent login
window.addEventListener('load', function() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        // Hide login form and other page elements
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';
        // Hide main page elements
        document.querySelector('.title').style.display = 'none';
        document.querySelector('.info').style.display = 'none';
        document.querySelector('.buttons').style.display = 'none';
        document.querySelector('.service-tag').style.display = 'none';
        document.querySelector('.services-list').style.display = 'none';
        // Hide any open sections
        document.getElementById('quotation-form').style.display = 'none';
        document.getElementById('accessories-section').style.display = 'none';
        loadStockAccessories();
    }
});
