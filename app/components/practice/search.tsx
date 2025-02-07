import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Text } from "@/components/text";
import { Practice } from "@/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { StartActivityBanner } from "../start-activity";
import { usePractices } from "@/hooks/practice/usePractices";
import { Input } from "../input";
import { PracticeCard } from "./card";
import { seedPractices } from "@/scripts/seed";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface Props {
  className?: string;
}

export function PracticeSearch(props: Props) {
  const { data: practices, refetch: refetchPractices } = usePractices();
  const [search, setSearch] = useState("");
  const [filteredPractices, setFilteredPractices] = useState<Practice[]>([]);

  useEffect(() => {
    if (!practices || !search.trim()) {
      setFilteredPractices(practices || []);
      return;
    }

    const searchTerm = search.trim().toLowerCase();
    const isNumeric = /^\d+$/.test(searchTerm);
    const searchNumber = isNumeric ? parseInt(searchTerm, 10) : null;

    setFilteredPractices(
      practices.filter((practice) => {
        const date = dayjs(practice.timestamp);

        const textMatch =
          practice.type.toLowerCase().includes(searchTerm) ||
          practice.notes?.toLowerCase().includes(searchTerm) ||
          practice.goals?.toLowerCase().includes(searchTerm) ||
          dayjs(practice.timestamp)
            .format("MMMM D")
            .toLowerCase()
            .includes(searchTerm);

        if (searchNumber !== null) {
          const ratingMatch =
            practice.rating !== undefined && practice.rating === searchNumber;
          const dateMatch = date.date() === searchNumber;
          const monthMatch = date.month() + 1 === searchNumber;
          const yearMatch = date.year() === searchNumber;

          return (
            textMatch || ratingMatch || dateMatch || monthMatch || yearMatch
          );
        }

        return textMatch;
      })
    );
  }, [search, practices]);

  let className = "flex-col mt-4";
  if (props.className) className += ` ${props.className}`;

  if (!practices) return null;

  if (practices?.length === 0) {
    return (
      <>
        <View className={className}>
          <StartActivityBanner />
        </View>
        <View className="flex flex-col items-center justify-center mt-4">
          <Text
            className="text-muted italic mt-4"
            onPress={() => refetchPractices()}
          >
            No sessions found
          </Text>
        </View>
      </>
    );
  }

  return (
    <View className={className} style={{ height: "100%" }}>
      <View className="flex flex-col mb-4">
        <View className="flex flex-row gap-4 justify-between mb-4">
          <Text className="text-xl font-bold text-base-content">
            Search
            <Text className="text-sm text-muted ml-2">
              (
              {filteredPractices.length === practices.length
                ? `${filteredPractices.length} sessions`
                : `${filteredPractices.length}/${practices.length} sessions`}
              )
            </Text>
          </Text>
        </View>
        <Input
          placeholder="Search notes, dates, goals, etc..."
          value={search}
          onChangeText={setSearch}
          showClear
        />
      </View>

      <View style={{ flex: 1 }}>
        {filteredPractices.map((item) => (
          <PracticeCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}
