export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50">
      {/* Top System Info */}
      <div className="border-b border-primary/30 py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center font-mono text-xs text-primary tracking-wider">
          <div>MODULE: STEGANOGRAPHY</div>
          <div>SYSTEM: ONLINE</div>
          <div>V.2.0 (STABLE)</div>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="py-8 border-b border-primary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <div className="text-white font-mono text-4xl font-bold tracking-wider inline">
              DORK{' '}
              <span className="bg-primary text-background px-3 py-1">SEARCH</span>
              {' '}PRO
            </div>
          </div>
          <div className="text-center text-primary font-mono text-sm tracking-widest opacity-70">
            MODULE: EMOJI STEGANOGRAPHY & SMUGGLING
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-primary/30 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-8 font-mono text-xs">
          <button className="text-primary/60 hover:text-primary transition">
            [ BACK_TO_SEARCH ]
          </button>
          <button className="text-primary/60 hover:text-primary transition">
            [ EXIF_TOOL ]
          </button>
          <button className="text-primary border border-primary px-2 py-1 hover:bg-primary/10 transition">
            [ EMOJI_CRYPT ]
          </button>
          <button className="text-primary/60 hover:text-primary transition">
            [ ACADEMY_DB ]
          </button>
        </div>
      </div>
    </header>
  );
}
