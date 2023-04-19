export default function music_file(source) {
    let bg_audio = new Audio(source);
    bg_audio.addEventListener("canplaythrough", event => {
        bg_audio.play();
    });
};