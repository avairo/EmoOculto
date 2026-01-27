export default function InfoSection() {
  return (
    <section className="mb-8">
      <div className="border-2 border-primary p-6">
        <div className="text-primary font-mono text-sm font-bold mb-4">INFO_PROTOCOL</div>
        <div className="text-primary font-mono text-sm font-bold mb-3">{'>> WHAT IS EMOJI SMUGGLING?'}</div>
        <p className="text-primary font-mono text-xs mb-4 leading-relaxed">Most people see emojis just as fun icons. Hackers see them as <span className="font-bold">containers.</span></p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-primary font-mono text-xs font-bold mb-3">{'// THE CONCEPT'}</div>
            <p className="text-primary font-mono text-xs leading-relaxed">
              Emoji Smuggling (Text Steganography) is the art of hiding a secret message inside a visible public message.
            </p>
          </div>
          
          <div>
            <div className="text-primary font-mono text-xs font-bold mb-3">{'// THE MECHANISM'}</div>
            <p className="text-primary font-mono text-xs leading-relaxed">
              We convert your secret text into <span className="italic">invisible characters</span> (Zero Width Joiners) and inject them between the emojis. The recipient sees emojis, but the computer sees the hidden data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
