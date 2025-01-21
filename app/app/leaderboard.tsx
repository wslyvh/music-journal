import { ScreenLayout } from "@/components/screen-layout";
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/text";
import { useQuery } from "@tanstack/react-query";
import { CONFIG, INSTRUMENTS } from "@/utils/config";
import { formatDuration } from "@/utils/format";
import { useInstrument } from "@/hooks/useInstrument";
import { InstrumentPicker } from "@/components/instrument-picker";

export default function Index() {
  const instrument = useInstrument();
  const [selectedInstrument, setSelectedInstrument] = useState(instrument);
  const [period, setPeriod] = useState(7);

  const { data } = useQuery({
    queryKey: ["leaderboard", selectedInstrument, period],
    enabled: !!selectedInstrument && !!period,
    queryFn: async () => {
      const res = await fetch(
        `${CONFIG.API_URL}/leaderboard/${selectedInstrument}?period=${period}page=1&size=10`
      );

      if (!res.ok) throw new Error("Failed to fetch sessions");

      const { data } = await res.json();
      return data;
    },
  });

  return (
    <ScreenLayout title="Leaderboard 👋">
      <InstrumentPicker
        className="text-base-content mb-4"
        items={INSTRUMENTS}
        selected={selectedInstrument ?? ""}
        onSelect={setSelectedInstrument}
      />

      <View className="flex flex-row rounded bg-base-200 text-base-content text-sm p-1 mb-4 mt-4">
        <TouchableOpacity
          onPress={() => setPeriod(7)}
          className={`flex-1 rounded items-center py-1 cursor-pointer ${
            period === 7 ? "bg-base-300" : ""
          }`}
        >
          <Text>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPeriod(30)}
          className={`flex-1 rounded items-center py-1 cursor-pointer ${
            period === 30 ? "bg-base-300" : ""
          }`}
        >
          <Text>Month</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-col">
        {data?.items.map((i: any, index: number) => {
          return (
            <View
              key={i.id}
              className={`flex flex-row text-base-content p-2
                ${index % 2 ? "bg-base-200 rounded" : ""}`}
            >
              <Text className="w-8 shrink-0 items-center">{index + 1}</Text>
              <Text className="flex-1">{i.username}</Text>
              <Text className="shrink-0">
                {formatDuration(i.duration, true, true)}
              </Text>
            </View>
          );
        })}
      </View>
    </ScreenLayout>
  );
}
