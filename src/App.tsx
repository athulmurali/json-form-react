import * as React from "react";
import { RootFormComponent } from "./FormRenderer";
export function App() {
  return <div id={container}>To be rendered here </div>;
}

const container = document.getElementById("container");
if (container) {
  container.innerHTML = RootFormComponent.render();
}
