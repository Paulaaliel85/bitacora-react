export interface Load {     // interface para representar cada carga de combustible
  litros: number;
  km: number;
}
//representan los datos de cada carga, con propiedades para los litros y kilómetros registrados en cada carga, ambas de tipo number
export const calculateStatics = (cargas: Load[]) => {   // función para calcular las estadísticas de consumo a partir de las cargas registradas
  if (cargas.length < 2) return null;

  const totalLiters = cargas.reduce(
    (acc, load) => acc + load.litros,
    0
  );
// se utiliza reduce para sumar los litros de todas las cargas, comenzando con un acumulador inicial de 0
  const totalDistance =
    cargas[cargas.length - 1].km - cargas[0].km;

  if (totalDistance <= 0) return null;
// se calcula la distancia total restando el km de la primera carga al km de la última carga, y si la distancia es menor o igual a 0, se retorna null para evitar cálculos inválidos
  const averageConsumption = totalDistance / totalLiters;
// se calcula el consumo promedio dividiendo la distancia total entre los litros totales
  return {
    totalDistance,
    totalLiters,
    averageConsumption,
  };
};