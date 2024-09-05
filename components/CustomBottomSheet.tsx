import { BottomSheetModalPropType } from "@/types/type";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";

type Ref = BottomSheetModal;
const CustomBottomSheet = forwardRef<Ref, BottomSheetModalPropType>(
  ({ children, snapPoints, color }, ref) => {


    const renderBackdrop = useCallback(function (
      props: BottomSheetBackdropProps
    ) {
      return (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      );
    },
    []);

    
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: "#eee" }}
        backgroundStyle={{ backgroundColor: color, borderTopLeftRadius: 10 }}
      >
        <BottomSheetView className="flex-1">{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default CustomBottomSheet;
