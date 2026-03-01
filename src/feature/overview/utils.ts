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
      title: "Receba ajuda instantânea",
      subtitle:
        "Obtenha respostas rápidas para suas dúvidas, a qualquer hora do dia!",
    },
  },
  {
    content: {
      img: Illustration2,
      title: "Evite anotações físicas",
      subtitle:
        "Marque o fim da dependência exclusiva de papel para anotar suas compras!",
    },
  },
  {
    content: {
      img: Illustration3,
      title: "Liste suas financias",
      subtitle: "Marque todas as suas financias em um único lugar!",
    },
  },
];
