export const PronouceNameTile = () => {
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance("Knock");
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-xl font-bold">Ngọc</span>
      <button onClick={playAudio} className="text-sm hover:text-emerald-400">
        🔊 Knock
      </button>
    </div>
  );
};
