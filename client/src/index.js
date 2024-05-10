import { createRoot } from "react-dom/client";
import { router } from "./routes/routes"

import { RouterProvider } from "react-router-dom";
import "./styles/styles.scss"
import LayoutProvider, { useLayout } from "./styles/layoutProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

console.log("🚀 ~ router:", router)
root.render(
    <LayoutProvider>
        <RouterProvider router={router} />
    </LayoutProvider>
);