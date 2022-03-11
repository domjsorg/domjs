
'use strict';

const VideoStream = require('videostream');
const toStream = require('it-to-stream');


document.addEventListener('DOMContentLoaded', async () => {
  const ipfs = await Ipfs.create({ repo: 'ipfs-' + Math.random() });

  log('IPFS: Initialising');

  // Set up event listeners on the <video> element from index.html
  const videoElement = createVideoElement();
  const cidInput = document.getElementById('cid');
  const goButton = document.getElementById('gobutton');
  let stream;

  goButton.onclick = function (event) {
    event.preventDefault();

    log(`IPFS: Playing ${cidInput.value.trim()}`);

    // Set up the video stream an attach it to our <video> element
    const videoStream = new VideoStream({
      createReadStream: function createReadStream(opts) {
        const start = opts.start;

        // The videostream library does not always pass an end byte but when
        // it does, it wants bytes between start & end inclusive.
        // catReadableStream returns the bytes exclusive so increment the end
        // byte if it's been requested
        const end = opts.end ? start + opts.end + 1 : undefined;

        log(`Stream: Asked for data starting at byte ${start} and ending at byte ${end}`);

        // If we've streamed before, clean up the existing stream
        if (stream && stream.destroy) {
          stream.destroy();
        }

        // This stream will contain the requested bytes
        stream = toStream.readable(ipfs.cat(cidInput.value.trim(), {
          offset: start,
          length: end && end - start
        }));

        // Log error messages
        stream.on('error', (error) => log(error));

        if (start === 0) {
          // Show the user some messages while we wait for the data stream to start
        }

        return stream;
      }
    }, videoElement);

  };

});
