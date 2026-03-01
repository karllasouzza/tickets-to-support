import { ImageSourcePropType } from "react-native";
import Illustration1 from "../../../assets/images/pexels-snapwire-7470.jpg";
import Illustration2 from "../../../assets/images/pexels-snapwire-7470.jpg";
import Illustration3 from "../../../assets/images/pexels-snapwire-7470.jpg";

export interface OverviewSlide {
  content: {
    img: ImageSourcePropType;
    title: string;
    subtitle: string;
  };
}

export const OVERVIEW_PAGES: OverviewSlide[] = [
  {
    content: {
      img: Illustration1,
      title: "Gerencie seus tickets",
      subtitle:
        "Acompanhe todos os chamados de suporte em um único lugar, organizados por data de abertura.",
    },
  },
  {
    content: {
      img: Illustration2,
      title: "Abra chamados rapidamente",
      subtitle:
        "Crie novos tickets com título, detalhes e prazo de encerramento em poucos segundos.",
    },
  },
  {
    content: {
      img: Illustration3,
      title: "Visualize sua performance",
      subtitle:
        "Acompanhe métricas, status dos chamados e os tickets resolvidos mais rapidamente no dashboard.",
    },
  },
];
