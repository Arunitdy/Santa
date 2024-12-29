let deliveries = JSON.parse(localStorage.getItem('deliveries')) || [
    {
        id: Date.now() + 1,
        childName: "Emma",
        gift: "Teddy Bear",
        location: "New York",
        status: "pending",
        timestamp: new Date().toLocaleString()
    },
    {
        id: Date.now() + 2,
        childName: "Liam",
        gift: "RC Car",
        location: "Los Angeles",
        status: "delivered",
        timestamp: new Date().toLocaleString()
    },
    {
        id: Date.now() + 3,
        childName: "Sophia",
        gift: "Storybook",
        location: "Chicago",
        status: "pending",
        timestamp: new Date().toLocaleString()
    }
];

function saveDeliveries() {
   // localStorage.setItem('deliveries', JSON.stringify(deliveries));
}

function addDelivery(childName, gift, location) {
    const delivery = {
        id: Date.now(),
        childName,
        gift,
        location,
        status: 'pending',
        timestamp: new Date().toLocaleString()
    };
    deliveries.unshift(delivery);
    saveDeliveries();
    displayDeliveries();
}

function toggleStatus(id) {
    const delivery = deliveries.find(d => d.id === id);
    if (delivery) {
        delivery.status = delivery.status === 'pending' ? 'delivered' : 'pending';
        saveDeliveries();
        displayDeliveries();
    }
}

function displayDeliveries(searchTerm = '') {
    const deliveryItems = document.getElementById('deliveryItems');
    deliveryItems.innerHTML = '';

    const filteredDeliveries = deliveries.filter(delivery => 
        delivery.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.gift.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredDeliveries.forEach(delivery => {
        const deliveryElement = document.createElement('div');
        deliveryElement.className = 'delivery-item';
        deliveryElement.innerHTML = `
            <h3>${delivery.childName}
                <span class="status status-${delivery.status}"
                      onclick="toggleStatus(${delivery.id})"
                      style="cursor: pointer;">
                    ${delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
                </span>
            </h3>
            <p><strong>Gift:</strong> ${delivery.gift}</p>
            <p><strong>Location:</strong> ${delivery.location}</p>
            <p><strong>Added:</strong> ${delivery.timestamp}</p>
        `;
        deliveryItems.appendChild(deliveryElement);
    });
}

document.getElementById('deliveryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const childName = document.getElementById('childName').value;
    const gift = document.getElementById('gift').value;
    const location = document.getElementById('location').value;

    addDelivery(childName, gift, location);
    e.target.reset();
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    displayDeliveries(e.target.value);
});

displayDeliveries();
