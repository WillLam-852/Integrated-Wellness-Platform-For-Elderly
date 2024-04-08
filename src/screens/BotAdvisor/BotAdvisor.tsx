import { useEffect, useState } from "react";
import { Text, ScrollView, View, Button } from 'react-native';
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { ApplicationScreenProps } from "@/types/navigation";

function BotAdvisor({ navigation}: ApplicationScreenProps) {
  const { t } = useTranslation();

  const {
		colors,
		variant,
		changeTheme,
		layout,
		gutters,
		fonts,
		components,
		backgrounds,
	} = useTheme();

  return (
    <SafeScreen>
      <ScrollView>
        <View>
          <Text>Bot Advisor Screen</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()}/>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default BotAdvisor;