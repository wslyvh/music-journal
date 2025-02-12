import React, { ReactNode, useCallback, useRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Pressable } from "react-native";
import { THEME_COLORS } from "@/utils/theme";

interface Props {
  trigger: ReactNode;
  children: ReactNode;
}

export function Sheet(props: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <>
      <Pressable onPress={handlePresentModalPress}>{props.trigger}</Pressable>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["80%"]}
        enableDynamicSizing={false}
        enableDismissOnClose={true}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: THEME_COLORS["base-100"] }}
        handleIndicatorStyle={{ backgroundColor: THEME_COLORS["base-300"] }}
        backdropComponent={({ style }) => (
          <Pressable
            onPress={handleClosePress}
            className="absolute inset-0 bg-black/50"
            style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
          />
        )}
      >
        <BottomSheetView className="flex-1 px-4 py-8">
          {props.children}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
