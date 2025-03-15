// Register Donor
document.getElementById('donorForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const donor = {
    name: document.getElementById('donorName').value,
    bloodGroup: document.getElementById('donorBloodGroup').value,
    location: document.getElementById('donorLocation').value,
    contact: document.getElementById('donorContact').value,
  };

  const response = await fetch('http://localhost:3000/api/donors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donor),
  });

  if (response.ok) {
    alert('Donor registered successfully!');
    document.getElementById('donorForm').reset();
  } else {
    alert('Failed to register donor.');
  }
});

// Submit Blood Request
document.getElementById('requestForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const request = {
    name: document.getElementById('requestName').value,
    bloodGroup: document.getElementById('requestBloodGroup').value,
    location: document.getElementById('requestLocation').value,
    contact: document.getElementById('requestContact').value,
    urgency: document.getElementById('requestUrgency').value,
  };

  const response = await fetch('http://localhost:3000/api/requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (response.ok) {
    alert('Blood request submitted successfully!');
    document.getElementById('requestForm').reset();
  } else {
    alert('Failed to submit blood request.');
  }
});
// Fetch and display notifications for a donor
async function fetchNotifications(donorId) {
  const response = await fetch(`http://localhost:3000/api/notifications/${donorId}`);
  if (response.ok) {
    const notifications = await response.json();
    const notificationsDiv = document.getElementById('notifications');
    notificationsDiv.innerHTML = notifications
      .map(
        (notification) => `
        <div class="notification ${notification.status}">
          <p>${notification.message}</p>
          <small>${new Date(notification.created_at).toLocaleString()}</small>
          <button onclick="markAsRead(${notification.id})">Mark as Read</button>
        </div>
      `
      )
      .join('');
  } else {
    console.error('Failed to fetch notifications');
  }
}

// Mark a notification as read
async function markAsRead(notificationId) {
  const response = await fetch(`http://localhost:3000/api/notifications/${notificationId}`, {
    method: 'PUT',
  });
  if (response.ok) {
    alert('Notification marked as read');
    fetchNotifications(1); // Refresh notifications (replace 1 with the actual donor ID)
  } else {
    alert('Failed to mark notification as read');
  }
}

// Example: Fetch notifications for donor with ID 1
fetchNotifications(1);