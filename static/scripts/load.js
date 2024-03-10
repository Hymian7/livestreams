document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('livestream-form');
    var loadingIndicator = document.getElementById('loading-indicator');

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
                var livestreams = JSON.parse(xhr.responseText);
                displayLivestreams(livestreams);
            }
            loadingIndicator.style.display = 'none'; // Hide loading animation after request completes
        };
        xhr.send(JSON.stringify({ 'link': link }));
    });

    function displayLivestreams(livestreams) {
        var livestreamContainer = document.getElementById('livestreams');

        livestreamContainer.innerHTML = ''; // Clear previous content

        if (livestreams.length > 0) {
            livestreams.forEach(function(livestream) {
                var livestreamDiv = document.createElement('div');
                livestreamDiv.classList.add('livestream-container');

                var h3 = document.createElement('h3');
                h3.textContent = livestream;

                var iframe = document.createElement('iframe');
                iframe.setAttribute('src', livestream);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-presentation');

                livestreamDiv.appendChild(h3);
                livestreamDiv.appendChild(iframe);

                livestreamContainer.appendChild(livestreamDiv);
            });
        } else {
            var message = document.createElement('p');
            message.textContent = 'No livestreams found.';
            livestreamContainer.appendChild(message);
        }
    }
});
