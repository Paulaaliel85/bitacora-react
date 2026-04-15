import { useState } from "react";

function App() {
  const [km, setKm] = useState("");
  const [litros, setLitros] = useState("");
  const [cargas, setCargas] = useState<any[]>([]);
  const [consumo, setConsumo] = useState(0);

  const agregarCarga = () => {
    const nuevaCarga = {
      km: Number(km),
      litros: Number(litros),
    };

    setCargas([...cargas, nuevaCarga]);

    setKm("");
    setLitros("");
  };

  const calcularConsumo = () => {
    if (cargas.length > 1) {
      const kmRecorridos =
        cargas[cargas.length - 1].km - cargas[0].km;

      const litrosTotales = cargas.reduce(
        (acc, c) => acc + c.litros,
        0
      );

      const resultado = kmRecorridos / litrosTotales;
      setConsumo(Number(resultado.toFixed(2)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        Bitácora de Consumo
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Kilómetros"
          value={km}
          onChange={(e) => setKm(e.target.value)}
          className="p-2 rounded bg-white text-black"
        />

        <input
          type="number"
          placeholder="Litros"
          value={litros}
          onChange={(e) => setLitros(e.target.value)}
          className="p-2 rounded bg-white text-black"
        />

        <button
          onClick={agregarCarga}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>

      {/* BOTÓN NUEVO */}
      <button
        onClick={calcularConsumo}
        className="bg-emerald-700 px-4 py-2 rounded hover:bg-emerald-800 mb-4"
      >
        Calcular Consumo
      </button>

      <table className="border border-gray-600">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Kilómetros</th>
            <th className="px-4 py-2">Litros</th>
          </tr>
        </thead>
        <tbody>
          {cargas.map((carga, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{carga.km}</td>
              <td className="px-4 py-2">{carga.litros}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-lg">
        Consumo total: {consumo}
      </p>
    </div>
  );
}

export default App;