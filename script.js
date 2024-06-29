var playlistId = 'PLJKGsLV6NngX7FyUPNOrCv3YNawUmQGxu'; // ID da sua playlist
var apiKey = 'YOUR_YOUTUBE_API_KEY'; // Substitua pela sua YouTube API Key

// Função para obter vídeo aleatório da playlist
function fetchRandomVideo(callback) {
    var apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var requestUrl = apiUrl + '?part=snippet&maxResults=50&playlistId=' + playlistId + '&key=' + apiKey;

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            var items = data.items;
            var randomIndex = Math.floor(Math.random() * items.length);
            var videoId = items[randomIndex].snippet.resourceId.videoId;
            callback(videoId);
        })
        .catch(error => console.error('Erro ao carregar a playlist:', error));
}

// Função para carregar e reproduzir áudio da playlist
function loadPlaylistAudio() {
    fetchRandomVideo(function(videoId) {
        var audioUrl = 'https://www.youtube.com/watch?v=' + videoId;
        document.getElementById('player').src = audioUrl;
    });
}

// Função para verificar e atualizar a playlist automaticamente a cada 5 minutos
function autoUpdatePlaylist() {
    setInterval(loadPlaylistAudio, 300000); // 300000 ms = 5 minutos
}

// Chamar a função para carregar e iniciar a reprodução do áudio da playlist
loadPlaylistAudio();

// Chamar a função para iniciar a verificação automática da playlist
autoUpdatePlaylist();
