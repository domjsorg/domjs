if (location.host === `localhost:8000`) {
    (() => new EventSource(`http://localhost:8006`).onmessage = () => location.reload())();
}
