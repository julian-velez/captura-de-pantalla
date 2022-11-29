const screenshotBTN = document.querySelector("#src-btn");
screenshotpreview = document.querySelector(".src-preview");
closeBtn = screenshotpreview.querySelector("#close-btn");

const captureScreen = async () => {
  try {
    // asking  permission to use a media input to record current tab
    const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    });
    const video = document.createElement("video");

    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      // passing video width  & height as canvas  width & height
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.play(); // playing the video so the drawn image won't be black or blank
      // drawing an image from the captured video stream
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      stream.getAudioTracks()[0].stop(); // terminating first video track of the stream
      // passing canvas data url as screenshot proview src
      screenshotpreview.querySelector(".img").src = canvas.toDataURL();
      screenshotpreview.classList.add("show");

    });
    video.srcObject = stream; // passing capture  stream data as video source object
  } catch (error) {
    alert("fallo captura");
  }
};

closeBtn.addEventListener
("click",()=> screenshotpreview.classList.toggle("show"));
screenshotBTN.addEventListener("click", captureScreen);
