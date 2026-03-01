import { useEffect } from "react";
import { Dimensions, Image } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import BootSplash from "react-native-bootsplash";
import manifest from "../../assets/bootsplash/manifest.json";
import logo from "../../assets/bootsplash/logo.png";

type Props = {
  onAnimationEnd: () => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const TOTAL_DURATION = 1200;

export function AnimatedBootSplash({ onAnimationEnd }: Props) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const { container, logo: logoProp } = BootSplash.useHideAnimation({
    manifest: manifest,
    logo: logo,

    animate: () => {
      translateY.value = withSequence(
        withDelay(200, withTiming(SCREEN_HEIGHT, { duration: 600 })),
      );

      opacity.value = withDelay(
        600,
        withTiming(0, { duration: 200 }, () => {
          runOnJS(onAnimationEnd)();
        }),
      );
    },
  });

  useEffect(() => {
    const timeout = setTimeout(onAnimationEnd, TOTAL_DURATION + 200);
    return () => clearTimeout(timeout);
  }, [onAnimationEnd]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      {...container}
      style={[container.style, containerAnimatedStyle]}
    >
      <Animated.View style={logoAnimatedStyle}>
        <Image {...logoProp} />
      </Animated.View>
    </Animated.View>
  );
}
