import L from "leaflet";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ userLocation, itemLocation }) => {
  // console.log('RM', userLocation, itemLocation);
  // console.log('RM - user', userLocation.latitude, userLocation.longitude);
  // console.log('ITEMS', itemLocation);
  // console.log('RM - item', itemLocation.latitude, itemLocation.longitude);

  const instance = L.Routing.control({
    waypoints: [
      L.latLng(userLocation.latitude, userLocation.longitude),
      L.latLng(itemLocation.latitude, itemLocation.longitude),
      // L.latLng(33.52001088075479, 36.26829385757446),
      // L.latLng(33.50546582848033, 36.29547681726967)
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: false,
    addWaypoints: true,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
