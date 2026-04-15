import { useState } from "react";
import type { Load } from "./models/types";
import { calculateStatics } from "./utils/calculations";

function App() {    // componente principal de la aplicación, donde se maneja el estado y la lógica para agregar cargas y calcular el consumo
  const [km, setKm] = useState("");
  const [litros, setLitros] = useState("");
  const [consumo, setConsumo] = useState(0);
  const [cargas, setCargas] = useState<Load[]>([]);
// se definen los estados para los kilómetros, litros, consumo y las cargas registradas, utilizando useState para manejar el estado de la aplicación
  const agregarCarga = () => {
    const nuevaCarga = {
      km: Number(km),
      litros: Number(litros),
    };

    setCargas([...cargas, nuevaCarga]);

    setKm("");
    setLitros("");
  };
// función para agregar una nueva carga de combustible a la lista de cargas//
const calcularConsumo = () => {
  const result = calculateStatics(cargas);

  if (result) {
    setConsumo(Number(result.averageConsumption.toFixed(2)));
  }
};
// función para calcular el consumo total utilizando la función calculateStatics, y si se obtiene un resultado válido, se actualiza el estado de consumo con el valor del consumo promedio formateado a dos decimales
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