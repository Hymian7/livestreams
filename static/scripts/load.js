document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('livestream-form');
    var loadingIndicator = document.getElementById('loading-indicator');
    var livestreams = [];
    var currentLivestreamIndex = 0;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        var link = document.getElementById('link').value;
        loadingIndicator.style.display = 'block'; // Show loading animation

        // Send an AJAX request to the server
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                livestreams = JSON.parse(xhr.responseText);
                displayLivestream(livestreams[currentLivestreamIndex]);
                loadingIndicator.style.display = 'none'; // Hide loading animation after request completes
            }
        };
        xhr.send(JSON.stringify({ 'link': link }));
    });

    function displayLivestream(livestreamUrl) {
        var livestreamContainer = document.getElementById('livestreams');
        livestreamContainer.innerHTML = ''; // Clear previous content
    
        var h3 = document.createElement('h3');
        h3.textContent = livestreamUrl;
    
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', livestreamUrl);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-presentation');
    
        var skipButton = document.createElement('button');
        skipButton.textContent = 'Skip';
        skipButton.addEventListener('click', function() {
            currentLivestreamIndex++;
            if (currentLivestreamIndex >= livestreams.length) {
                currentLivestreamIndex = 0; // Loop back to the beginning if we've reached the end
            }
            displayLivestream(livestreams[currentLivestreamIndex]);
        });
    
        livestreamContainer.appendChild(h3);
        livestreamContainer.appendChild(iframe);
        livestreamContainer.appendChild(skipButton);
    }
});
