    import { createRoot } from "react-dom/client";
    import { RootFormComponent } from "./FormRenderer";
    // import "./main.css";

    const root = createRoot(document.getElementById("app"));
    const container = document.getElementById("app");

    root.render(<RootFormComponent />);
