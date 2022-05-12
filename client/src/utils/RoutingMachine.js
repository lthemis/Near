import L from "leaflet";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
// import styles from "./RoutingMachine.module.scss";

const createRoutineMachineLayer = ({ userLocation, itemLocation }) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(userLocation.latitude, userLocation.longitude),
      L.latLng(itemLocation.latitude, itemLocation.longitude),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
  });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
