document.getElementById('startHealthCheck').addEventListener('click', function () {
    const resultDiv = document.getElementById('healthCheckResult');
    resultDiv.style.display = 'block';  // Show the result div
    resultDiv.innerHTML = '<p>Checking system health...</p>';
  
    fetch('/api/healthcheck')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'healthy') {
          resultDiv.innerHTML = '<p>All systems are healthy! 👍</p>';
        } else {
          resultDiv.innerHTML = '<p>There is an issue with the system. Please try again later.</p>';
        }
      })
      .catch(error => {
        resultDiv.innerHTML = '<p>Error: Unable to perform health check.</p>';
        console.error('Health check failed:', error);
      });
  });
  