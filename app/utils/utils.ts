export const getTypeColors = (type: string) => {
  switch (type) {
    case "fire":
      return "bg-gradient-to-r from-[#F08030] to-[#9C531F]";
    case "water":
      return "bg-gradient-to-r from-[#6890F0] to-[#445E9C]";
    case "grass":
      return "bg-gradient-to-r from-[#78C850] to-[#4E8234]";
    case "electric":
      return "bg-gradient-to-r from-[#F8D030] to-[#A1871F]";
    case "normal":
      return "bg-gradient-to-r from-[#A8A878] to-[#6D6D4E]";
    case "flying":
      return "bg-gradient-to-r from-[#A890F0] to-[#6D5E9C]";
    case "poison":
      return "bg-gradient-to-r from-[#A040A0] to-[#682A68]";
    case "ground":
      return "bg-gradient-to-r from-[#E0C068] to-[#927D44]";
    case "psychic":
      return "bg-gradient-to-r from-[#F85888] to-[#A13959]";
    case "bug":
      return "bg-gradient-to-r from-[#A8B820] to-[#6D7815]";
    case "rock":
      return "bg-gradient-to-r from-[#B8A038] to-[#786824]";
    case "ghost":
      return "bg-gradient-to-r from-[#705898] to-[#493963]";
    case "dragon":
      return "bg-gradient-to-r from-[#7038F8] to-[#4924A1]";
    case "dark":
      return "bg-gradient-to-r from-[#705848] to-[#49392F]";
    case "steel":
      return "bg-gradient-to-r from-[#B8B8D0] to-[#787887]";
    case "fairy":
      return "bg-gradient-to-r from-[#EE99AC] to-[#9B6470]";
    default:
      return "bg-gradient-to-r from-[#FFFFFF] to-[#000000]";
  }
};

export function getStatLabel(stat: string) {
  switch (stat) {
    case "hp":
      return "bg-lime-300";
    case "attack":
      return "bg-red-300";
    case "defense":
      return "bg-indigo-300";
    case "special-attack":
      return "bg-yellow-300";
    case "special-defense":
      return "bg-cyan-300";
    case "speed":
      return "bg-pink-300";
    default:
      return "bg-white";
  }
}
