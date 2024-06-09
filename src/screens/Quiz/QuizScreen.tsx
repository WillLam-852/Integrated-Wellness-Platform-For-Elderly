import {
  Text,
} from "react-native"
import { SafeScreen } from "@/components/template";
import { MainBottomTabScreenProps } from "@/navigators/navigation";
import React from "react";

function QuizScreen({ navigation }: MainBottomTabScreenProps) {
  return (
    <SafeScreen>
      <Text>
        QuizScrren
      </Text>
    </SafeScreen>
  )
}

export default QuizScreen;