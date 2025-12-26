import LatestCarousel from "../../component/reusable/activites/latest";
// import { ActivitiesSection } from "@/app/component/reusable/activites/main";
import React from "react";
import { ActivitiesSection } from "../../component/reusable/activites/main";

const ActivityScreen = () => {
  return (
    <div>
      <ActivitiesSection />
      <LatestCarousel />
      {/* <LatestCarousel showTitle={false} marginTop="-mt-30" />
      <LatestCarousel showTitle={false} marginTop="-mt-30" /> */}
    </div>
  );
};

export default ActivityScreen;
