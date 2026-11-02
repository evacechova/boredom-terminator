"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

const EventMap = () => {
  return <LeafletMap />;
};
export default EventMap;
