export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 shadow-sm relative z-[9999]">
      {/* Kiri: Coba panggil file logo Bandar Lampung */}
      <div className="flex items-center">
        <img
          src="LOGO_KOTA_BANDAR_LAMPUNG_BARU.png"
          alt="Logo Bandar Lampung"
          style={{ height: "48px", width: "auto", display: "block" }}
          onError={(e) => { e.target.src = "./LOGO_KOTA_BANDAR_LAMPUNG_BARU.png" }}
        />
      </div>

      {/* Kanan: Coba panggil file logo Universitas Teknokrat */}
      <div className="flex items-center">
        <img
          src="UNIVERSITASTEKNOKRAT.png"
          alt="Logo Universitas Teknokrat"
          style={{ height: "48px", width: "auto", display: "block" }}
          onError={(e) => { e.target.src = "./UNIVERSITASTEKNOKRAT.png" }}
        />
      </div>
    </header>
  );
}
